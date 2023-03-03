import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes,updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  

  const notificationReducer = (state, action) => {
    console.log("Notification reducer called", action)
  switch (action.type) {
    case "DISPLAY":
        console.log("Display")
        return action.payload
    case "REMOVE":
        console.log("")
        return ""
    default:
        return state
  }
}
const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
   

  const handleVote = (anecdote) => {
    console.log('vote')
    
    const updatedAnecdote={...anecdote, votes: anecdote.votes+1}
    updateNoteMutation.mutate(updatedAnecdote)
     notificationDispatch({type: 'DISPLAY', payload: `anecdote ${anecdote.content} voted`})
    setTimeout(() => {
  notificationDispatch({type: 'REMOVE', payload: ""})
}, 5000)
  }

  const result = useQuery(
    'anecdotes',getAnecdotes
  )
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

   if ( result.isError ) {
    return <div>anecdote service not available due to problems in server...</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <Notification/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
       </NotificationContext.Provider>
    </div>
  )
}

export default App
