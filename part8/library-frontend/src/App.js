import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {gql,useQuery } from '@apollo/client'
import ModifyAuthor from './components/ModifyAuthor'
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'


const query = gql`
  query {
    allBooks  {
      title
      author{
        name
      }
      published
      genres
    }
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(query)
  
  
  if (result.loading) {
    return <div>loading...</div>
  }
  if(result.error){
     return <div>error...</div>
  }

  console.log(result.data.allAuthors)
  const authors=result.data.allAuthors
  const books=result.data.allBooks

  const logout = () => {
    console.log("logout")
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?<button onClick={() => setPage('add')}>add book</button>:null}
        {token?null:<button onClick={() => setPage('login')}>Login</button>}
        {token?<button onClick={() => setPage('modifyauthor')}>Modify Author</button>:null}
        {token?<button onClick={logout}>logout</button>:null}
        {token?<button onClick={() => setPage('recommended')}>Recommended</button>:null}
      </div>

      <Authors show={page === 'authors'} authors={authors} query={query}/>

      <Books show={page === 'books'} books={books}/>
      {token?<Recommended show={page === 'recommended'} books={books} />:null}
      <NewBook show={page === 'add'} query={query} token={token} />
      <LoginForm show= {page==='login'} setToken={setToken} token={token}/>
      <ModifyAuthor show= {page==='modifyauthor'} authors={authors} token={token} query={query}/>
      
    </div>
  )
}

export default App
