import { useState, useEffect } from 'react'
import Filer from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const personExists = (arr, val) =>{
  if (arr.filter(e => e.name === val).length > 0) {
    return true
  }
return false
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [styleClass, setStyleClass] = useState('')
 

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
     
    console.log(personExists(persons,newName), "check if person exits")

     if (personExists(persons,newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
            const personObject= persons.filter(person=>person.name===newName)
            console.log('person to update', personObject)
            personObject[0].number = newNumber
            console.log('updated object', personObject)
             console.log('id to update', personObject[0].id)
            personService
            .update(personObject[0].id, personObject[0])
      .     then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personObject[0].id ? person : updatedPerson))
            })
            .catch(error => {
              console.log("The person already deleted")
            setMessage(
          `the person '${newName}' was already deleted from server`
        )
        setStyleClass('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
            setPersons(persons.filter(person => person.id !== personObject[0].id))
    })

      }
     }
  else{
      const personObject = {
      name: newName,
      number: newNumber,
      }

    personService
      .create(personObject)
      .then(newPerson => {
        const newPersons = persons.concat(newPerson)
        console.log('new persons', newPersons)
        setPersons(newPersons)
      })
      setMessage(
          `Added '${newName}'`
        )
        setStyleClass('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const displayList= persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))

  useEffect(() => {
  personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
}, [])

const handleDelete= (id, name) =>{
  if (window.confirm("Delete " + name + " ?" ) ){
  console.log('delete', id)
  personService
      .del(id)
      .then(data=> {
        console.log('deleted', data)
        personService
      .getAll()
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
      })

    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} classToUse={styleClass} />
     <Filer filer={filter} handleFilterChange= {handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons displayList={displayList} handleDelete={handleDelete}/>
       
    </div>
  )
}

export default App