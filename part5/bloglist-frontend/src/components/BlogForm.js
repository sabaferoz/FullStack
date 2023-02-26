

import { useState } from 'react'


const BlogForm = ({ updateBlogs }) => {
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
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            id="url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="addBlog">Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm