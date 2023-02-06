const Name = (props) => {
  return (
    <>
    <li>{props.name} {props.number}</li>
    <button onClick={props.handleDelete}>Delete</button>
  </>
  )
}

export default Name