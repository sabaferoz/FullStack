import Name from "./Name"
const Persons = ({displayList, handleDelete}) => {
  return (
     <ul>
          {displayList.map(person => 
            <Name key={person.name} name={person.name} number={person.number} handleDelete={()=> handleDelete(person.id, person.name)} />
          )}
        </ul>
  )
}

export default Persons