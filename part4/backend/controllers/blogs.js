const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
    
})


blogsRouter.post('/',middleware.userExtractor, async (request, response) => {
  body= request.body
  if (!body.likes){
    body.likes=0
  }
  if (!body.title || !body.url){
    response.status(400).send('Bad Request')
  }else{
   
  const user = request.user
  const blog = new Blog({
    title:body.title,
    url: body.url,
    likes: body.likes,
    user: user._id

  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog) 
  }
})

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const id = request.params.id
  const userId=decodedToken.id
  const blog = await Blog.findById(id)
  if ( blog.user.toString() === userId.toString() ){
  await Blog.findOneAndDelete(id)
  response.status(204).end()
  }else{
    return response.status(401).json({ error: 'The user is not allowed to delete this blog' })
  }
})


blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog= await Blog.findById(id)
  if(blog){
  response.json(blog)
  }
  else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog= await Blog.findByIdAndUpdate(id, request.body, {new: true} )
  if(blog){
  response.json(blog)
  }
  else{
    response.status(404).end()
  }
})

module.exports = blogsRouter