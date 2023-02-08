const PersonForm = ( props ) => {
  return (
    <form onSubmit={props.addPerson}>
        <h3> Add a new</h3>
        <div>
          name: 
          <input
           value={props.newName}
           onChange={props.handleNameChange}
          />
          </div>
          <div>
            number:
          <input  value={props.newNumber}
           onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm