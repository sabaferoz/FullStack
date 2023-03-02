import {  useDispatch, useSelector } from 'react-redux'
import {  voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
const Anecdotes=()=>{
         const dispatch = useDispatch()
         const anecdotes = useSelector(state => {
          console.log("filter", state.filter)
          console.log("anecdotes", state.anecdote)
          
    if ( state.filter === '' ) {
      return state.anecdote
    }
    return  state.anecdote.filter(anecdote => {
      console.log(anecdote.content.toUpperCase(), state.filter.toUpperCase())
      return anecdote.content.toUpperCase().startsWith(state.filter.toUpperCase())})
  })

  const addVote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
    
  }
return(
    <>
    <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes <br/>
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </>
)
        }

export default Anecdotes