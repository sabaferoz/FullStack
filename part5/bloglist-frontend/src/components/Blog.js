import blogService from '../services/blogs'

const Blog = ({ blog,  user, handleNotificationChange, handleBlogChange, handleBlogDeletion }) => {
  console.log('user transferred to blog:', user)
  const addLikes = async (event) => {
    event.preventDefault()
    console.log('increasing likes for blog', `${blog.title}`)
    try {
      console.log(blog.id)
      const newBlog={ _id: blog.id, likes: blog.likes+1, title: blog.title, url: blog.url,
        user: blog.user.id }
      const updatedBlog = await blogService.update(blog.id, newBlog)
      console.log('new blog', newBlog)
      console.log('Blog updated ', updatedBlog)
      blog.likes=blog.likes+1
      handleBlogChange(updatedBlog)

    } catch (exception) {
      console.log(exception)
      handleNotificationChange('Unable to update blog', 'error')
    }
  }

  const deleteBlog= async(event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.user.username}?`)){
      console.log('deleting blog', `${blog.title}`)
      try {
        const resp =await blogService.remove(blog.id)
        console.log('response', resp)
        handleNotificationChange(`Removed blog ${blog.title} by ${blog.user.username}`,'success')
      }catch(exception){
        handleNotificationChange(`Deletion of blog ${blog.title} by ${blog.user.username} failed`,'error')
      }
      handleBlogDeletion(blog.id)

    }
  }

  const removeButton =() => {

    if(user && blog.user.username=== user.username){
      return(
        <div><button onClick={deleteBlog}>Remove</button></div>)
    }
  }


  return(
    <div>
      <div>
    Author: {blog.user.username}
      </div>
      <div>
    Url: {blog.url}
      </div>
      <div>
    Likes: {blog.likes} <button onClick={addLikes}>Like</button>
      </div>
      {removeButton()}

    </div>
  )
}

export default Blog