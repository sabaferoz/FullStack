import { useMutation, useQueryClient } from 'react-query'
import {  createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationiContext from '../NotificationContext'

const AnecdoteForm = () => {
const [notification, dispatch] = useContext(NotificationiContext)

const queryClient = useQueryClient()

  const getId = () => (100000 * Math.random()).toFixed(0)
   const newAnecdoteMutation = useMutation(createAnecdote )

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
     newAnecdoteMutation.mutate({ content, votes:0, id: getId()  },{onSuccess: () =>{
        queryClient.invalidateQueries('anecdotes')
        dispatch({type: 'DISPLAY', payload: `anecdote ${content} added`})
    setTimeout(() => {
  dispatch({type: 'REMOVE', payload: ""})
}, 5000)
      }})
      
    if (newAnecdoteMutation.isError){
      dispatch({type: 'DISPLAY', payload: `too short anecdote, must have length 5 or more`})
    setTimeout(() => {
  dispatch({type: 'REMOVE', payload: ""})
}, 5000)
    }
   
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
