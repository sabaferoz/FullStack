import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
console.log(content)
  const response = await axios.post(baseUrl, asObject(content))
  console.log(response.data)
  return response.data
}

const modifyAnecdote = async (id, anecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  console.log(response.data)
  return response.data
}

export default { 
    getAll, 
    createNew,
    modifyAnecdote,
 }