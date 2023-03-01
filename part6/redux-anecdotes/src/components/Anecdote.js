import {  useDispatch, useSelector } from 'react-redux'
import {  vote } from '../reducers/anecdoteReducer'
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

  const addVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
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
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </>
)
        }

export default Anecdotes