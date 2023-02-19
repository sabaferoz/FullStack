

import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, updateBlogs, handleNotificationChange
}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')


  const addNewBlog = async (event) => {
    event.preventDefault()
    console.log('adding new blog')
    try {
      const newBlog = await blogService.create({
        'title': title, 'url': url
      })
      console.log('Blog created ', newBlog)
      console.log('before user', newBlog.user)
      newBlog.user={ 'username': user.username, 'id': user.id }
      console.log('user', newBlog.user)
      updateBlogs(newBlog)
      setTitle('')
      setUrl('')
      handleNotificationChange(`a new blog ${title} by ${user.username}`, 'success')
    } catch (exception) {
      console.log(exception)
      handleNotificationChange('Unable to add blog', 'error')
    }
  }


  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm