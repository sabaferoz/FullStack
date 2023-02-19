const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/blog')

const initialBlogs =  [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
    },
    {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

describe('when there are initially two posts in db', () => {

beforeEach(async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  const userResp=await user.save()
  await Blog.deleteMany({})
  initialBlogs[0].user=userResp.id
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  initialBlogs[1].user=userResp.id
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
}, 100000)



test('blog posts have unique id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
}, 100000)

test('if like property is missing, it is set to 0', async () => {

    const loginResponse = await api.post('/api/login')
    .send({username:'root', password: 'sekret'})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const token= loginResponse.body.token


       console.log("TOKEN", loginResponse.body.token)
       
  const newblog = {
    title: "test",
    author: "Edsger 1",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  }

 const response= await api
    .post('/api/blogs')
    .set({Authorization: `bearer ${token}`})
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    console.log(response)
    const likes= response.body.likes
    console.log('likes', likes)
    expect(likes).toEqual(0)

}, 100000)

test('if title or url is missing, 400 is received', async () => {
  const newblog = {
    author: "Edsger 1",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  }

 await api
    .post('/api/blogs')
    .send(newblog)
    .expect(400)

  const newblog1 = {
    title: "test",
    author: "Edsger 1",
  }

   await api
    .post('/api/blogs')
    .send(newblog1)
    .expect(400)
    

}, 100000)


test('get blog with a specific id', async () => {
  const response= await api.get('/api/blogs')
  const id = response.body[0].id
  const blog= await api.get("/api/blogs/" +  id)
  expect(blog.body.title).toEqual(initialBlogs[0].title)
  expect(blog.body.author).toEqual(initialBlogs[0].author)
  
}, 100000)

test('delete blog with specific id', async () => {
  

    const loginResponse = await api.post('/api/login')
    .send({username:'root', password: 'sekret'})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const token= loginResponse.body.token


       console.log("TOKEN", loginResponse.body.token)
     

  const response= await api.get('/api/blogs')
  const id = response.body[0].id
  await api.delete('/api/blogs/' +  id)
  .set('Authorization',token )
  .expect(204)

  const response2= await api.get('/api/blogs')
  expect(response2.body).toHaveLength(1)
  
}, 100000)

test('update a specific blog', async () => {
  const response= await api.get('/api/blogs')
  const id = response.body[0].id
  var blog= response.body[0]
  blog.title= "New Title"
  const updatedBlog= await api.put("/api/blogs/" +  id)
  expect(blog.title).toEqual("New Title")
  expect(blog.author).toEqual(initialBlogs[0].author)
  
}, 100000)

})

afterAll(async () => {
  await mongoose.connection.close()
})
