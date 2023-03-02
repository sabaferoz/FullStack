import Anecdotes from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import {useEffect} from  'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <Anecdotes />
      <AnecdoteForm/>
    </div>
  )
}

export default App