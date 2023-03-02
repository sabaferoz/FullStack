import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice(
{
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const changedAnecdote= action.payload
      const newAnecdotes= state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote )
      return newAnecdotes.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
}

)

export const {  vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
return async dispatch => {
const newAnecdote = await anecdoteService.createNew(content)
 dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
return async dispatch => {
  console.log("vote anecdote", anecdote)
const updatedAnecdote={...anecdote, votes: anecdote.votes+1 }
console.log("updated anecdote", updatedAnecdote)
const newAnecdote = await anecdoteService.modifyAnecdote(updatedAnecdote.id, updatedAnecdote)
 dispatch(vote(updatedAnecdote))
  }
}



export default anecdoteSlice.reducer