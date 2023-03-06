import { useState, useEffect } from 'react'

import {gql,useQuery, useLazyQuery } from '@apollo/client'
const query = gql`
  query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author{
      name
    }
    published
  }
}
`

const Books = (props) => {
  const [books, setBooksToShow]=useState(props.books)
  const [getFiltered,result]=useLazyQuery(query, {
    fetchPolicy: "no-cache",
  }) 

 useEffect(() => {
      if(result.data){
     console.log("filtered books", result)
     setBooksToShow(result.data.allBooks)
      }
   }, [result.data]);

  if (!props.show) {
    return null
  }
  const genres=[]
  props.books.filter(book=>{
    return book.genres.map(genre=>genres.indexOf(genre)===-1?genres.push(genre):null)
  })
  genres.push("all")
  console.log("genres",genres)

  /*const filterByGenre =(event)=>{
    console.log("filter event called", event.target.value)
    const genre=event.target.value
    if(genre==="all")
      setBooksToShow(props.books)
    else
    setBooksToShow(props.books.filter(book=>book.genres.includes(genre)))
        
  }*/

  const filterByGenre = (event)=>{
      console.log("filter event called", event.target.value)
    const genre=event.target.value
    if(genre==="all")
      setBooksToShow(props.books)
    else{
     getFiltered({variables: {genre:genre}});
     
      
    }
  }


  return (
    <div>
      <h2>books</h2>

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
      <div>
         {genres.map( g=> (
          <button key={g} onClick={filterByGenre} value={g}>{g}</button>
         ))}
    </div>
    </div>
    
  )
}

export default Books
