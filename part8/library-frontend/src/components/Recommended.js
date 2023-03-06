
import {gql,useQuery } from '@apollo/client'
const query = gql`
  query{
    me {
    username
    favoriteGenre
  }
}
`

const Recommended = (props) => {
    const result = useQuery(query)
  if (!props.show) {
    return null
  }
  
  
  if (result.loading) {
    return <div>loading...</div>
  }
  if(result.error){
    console.log(result)
     return <div>error...</div>
  }

  const genre= result.data.me.favoriteGenre
  console.log(genre)
  
  const books= props.books.filter(book=>book.genres.includes(genre))
  return (
    <div>
      <h2>Recommendations</h2>
        books in your favorite genre patterns
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  )
}

export default Recommended
