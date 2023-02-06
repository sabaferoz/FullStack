import { useState } from 'react'
import Filer from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const personExists = (arr, val) =>{
  if (arr.filter(e => e.name === val).length > 0) {
    return true
  }
return false
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '0900-78601'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
 

  const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

  const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

  const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}


  const addPerson = (event)=>{
     event.preventDefault()
     
    console.log(personExists(persons,newName), "chwk")
     if (personExists(persons,newName)){
      return (alert(`${newName} is already added to phonebook`))
     }
     const personObject = {
      name: newName,
      number: newNumber,
      }

    const newPersons = persons.concat(personObject)
    console.log('new persons', newPersons)
    setPersons(newPersons)
    console.log('updated persons', persons)

  }

  const displayList= persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
     <Filer filer={filter} handleFilterChange= {handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons displayList={displayList}/>
       
    </div>
  )
}

export default App