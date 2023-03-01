import {  useDispatch, useSelector } from 'react-redux'
import {  vote } from './reducers/anecdoteReducer'
const Anecdotes=({})=>{
         const dispatch = useDispatch()
         const anecdotes = useSelector(state => state)

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