import { useState } from 'react'
import {useField} from '../hooks'
import {
  useNavigate
} from 'react-router-dom'

const AnecdoteForm = (props) => {
  const navigate = useNavigate()
  /*const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')*/
  const author = useField('text')
  const content = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
     navigate('/')
     props.setNotification(`a new anecdote ${content} created!`)
     setTimeout(() => {
          props.setNotification("")
        }, 5000)
  }

  const reset = () =>{
    console.log("reset called")
    content.onReset()
    author.onReset()
    info.onReset()

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} name='content'  />
        </div>
        <div>
          author
          <input {...author} name='author' />
        </div>
        <div>
          url for more info
          <input {...info} name='info'  />
        </div>
        <button>create</button>
        
      </form>
      <button onClick={reset}>reset</button>
    </div>
  )

}

export default AnecdoteForm