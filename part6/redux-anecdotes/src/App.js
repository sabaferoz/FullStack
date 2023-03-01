import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, vote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const addAnecdote = (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log("content", content)
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App