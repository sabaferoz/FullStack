import { useSelector } from 'react-redux'
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(state=>{
    if (state.notification===""){
      style.border='none'
      style.borderWidth=0 
      style.padding=0 
    }else{
      style.border='solid'
      style.borderWidth=1 
      style.padding=10 
      
    }
    
    return state.notification})
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification