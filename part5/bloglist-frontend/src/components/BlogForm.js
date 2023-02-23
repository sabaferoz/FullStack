

import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({updateBlogs,
}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')


  const addNewBlog = async (event) => {
    event.preventDefault()
    console.log('adding new blog')
    updateBlogs(title,url)
    setTitle('')
      setUrl('')
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