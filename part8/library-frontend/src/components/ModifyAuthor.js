import Select from "react-select";
import {useState} from 'react'
import {gql,useMutation } from '@apollo/client'
import Notify from './Notify'

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
const ModifyAuthor = (props) => {
    const [born,setBirthYear] = useState('')
  const [name,setSelectedAuthor] = useState("")
  const [ changeBorn ] = useMutation(EDIT_BORN, {
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

  const authors = props.authors
  const options = authors.map(author=>{
    return {"value": author.name, "label": author.name}
  })
  
     const updateAuthor =async (event) =>{
    event.preventDefault()
    console.log("update author", name, born)
      changeBorn({ variables: { name:name, setBornTo: born } })
      setBirthYear('')
      setSelectedAuthor("")
 }

return (
    <div>
        <h3> Change Author Form</h3>
          <form onSubmit={updateAuthor}>
        <div>
          Author Name
          <Select 
          value={options.filter(function(option) {
          return option.value === name;
        })}
          required
          options={options}  
          onChange={({ value }) => setSelectedAuthor(value)}
          >
            
          </Select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBirthYear(target.valueAsNumber)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
      </div>
        )

    }    
    
export default ModifyAuthor