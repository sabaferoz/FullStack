import '../index.css'
const Notification = ({ message, classToUse }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classToUse}>
      {message}
    </div>
  )
}

export default Notification