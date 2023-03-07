import { useRef, useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [styleClass, setStyleClass] = useState('')



  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('setting user', user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotificationChange = (message,style) => {

    setMessage(message)
    setStyleClass(style)
    setTimeout(() => {
      setMessage('')
      setStyleClass('')
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('Logged in user ', window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)
      setUser(user)
      console.log('user:', user.username)
      setUsername('')
      setPassword('')
      setMessage('Login successful')
      setStyleClass('success')
      setTimeout(() => {
        setMessage('')
        setStyleClass('')
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setMessage('Wrong credentials')
      setStyleClass('error')
      setTimeout(() => {
        setMessage(null)
        setStyleClass(null)
      }, 5000)
    }
  }

  const updateBlogs = async(title,url) => {
    try {
      const newBlog = await blogService.create({
        'title': title, 'url': url
      })
      console.log('Blog created ', newBlog)
      console.log('before user', newBlog.user)
      newBlog.user={ 'username': user.username, 'id': user.id }
      console.log('user', newBlog.user)
      handleNotificationChange(`a new blog ${title} by ${user.username}`, 'success')
      console.log('author',newBlog.user.username)
      blogFormRef.current.toggleVisibility()
      const newBlogs=blogs.concat(newBlog)
      newBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception)
      handleNotificationChange('Unable to add blog', 'error')
    }
  }

  const handleBlogChange = async (blog) => {
    try {
      console.log(blog.id)
      const newBlog={ _id: blog.id, likes: blog.likes+1, title: blog.title, url: blog.url,
        user: blog.user.id }
      const updatedBlog = await blogService.update(blog.id, newBlog)
      console.log('new blog', newBlog)
      console.log('Blog updated ', updatedBlog)
      blog.likes=blog.likes+1
      const updatedBlogs=blogs.map(blog => {
        if(blog.id===updatedBlog)
          blog.likes=updatedBlog.likes

        return blog

      })
      console.log(updatedBlogs)
      updatedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogs)

    } catch (exception) {
      console.log(exception)
      handleNotificationChange('Unable to update blog', 'error')
    }
  }

  const handleBlogDeletion = (id) => {
    const newBlogs= blogs.filter(blog => blog.id!==id)
    setBlogs(newBlogs)
  }



  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logout called')
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    setUser(null)
    console.log('ddd')


  }

  const loginForm = () => (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login">login</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <Togglable buttonLabel="Add new blog" showButtonId="addNewBlog" cancelButtonLabel="cancel" ref={blogFormRef}>

        <BlogForm updateBlogs={updateBlogs}/>
      </Togglable>

    )
  }

  const userData = () => (
    <div>
      {user.username} logged in

      <button onClick={handleLogout} id="logout">logout</button>
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification message={message} classToUse={styleClass} />
      {user === null? loginForm(): userData()}

      {user !==null && blogForm()}

      <h2>Blogs List</h2>

      {blogs.map(blog => {
        return(
          <>
            <div style={blogStyle} className="blog">
      Title: {blog.title}
              <Togglable buttonLabel="view" showButtonId="view" cancelButtonLabel="hide" >
                <Blog key={blog.id} blog={blog} user={user} handleNotificationChange={handleNotificationChange} handleBlogChange={handleBlogChange} handleBlogDeletion={handleBlogDeletion}/>
              </Togglable>
            </div>
          </>
        )
      }
      )}

    </div>
  )
}

export default App