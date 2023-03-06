import { useState } from 'react'
import {gql,useMutation } from '@apollo/client'
import Notify from './Notify'

  const CREATE_BOOK = gql`
mutation createBook($author: String!, $title: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    author: $author,
    title: $title,
    published: $published,
    genres: $genres
  ) {
    title
    author{
      name
    }
  }
}
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([]) 



  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: props.query } ],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      return (
      <div>
        <Notify errorMessage={messages} />
      </div>)
    }
  })

  if (!props.show) {
    return null
  }

  if (!props.token) {
    return (
      <div>
        <Notify errorMessage={"Please login to add books"} />
      </div>
    )
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({  variables: { author, title, published, genres } })

    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook