import { useState } from 'react'
const Books = (props) => {
  const [books, setBooksToShow]=useState(props.books)
  if (!props.show) {
    return null
  }
  const genres=[]
  props.books.filter(book=>{
    return book.genres.map(genre=>genres.indexOf(genre)===-1?genres.push(genre):null)
  })
  genres.push("all")
  console.log("genres",genres)

  const filterByGenre =(event)=>{
    console.log("filter event called", event.target.value)
    const genre=event.target.value
    if(genre==="all")
      setBooksToShow(props.books)
    else
    setBooksToShow(props.books.filter(book=>book.genres.includes(genre)))
        
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
