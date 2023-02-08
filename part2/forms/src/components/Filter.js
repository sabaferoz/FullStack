const Filter = ( props ) => {
  return ( 
    <div>
      handler filter change:
          <input
           value={props.filter}
           onChange={props.handleFilterChange}
          />
          </div>
  )
}

export default Filter