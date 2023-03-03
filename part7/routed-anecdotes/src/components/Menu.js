
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import About from './About'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Anecdote from './Anecdote'

const Menu = ({anecdotes, addNew, setNotification}) => {
  

  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/new">Add anecdotes</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Routes>
        <Route path="/new" element={<AnecdoteForm addNew={addNew} setNotification={setNotification}/>} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>
      </Router>
  )
}

export default Menu