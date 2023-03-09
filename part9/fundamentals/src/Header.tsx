
interface HeaderProps{
    name:string
}

const Header=(props:HeaderProps)=>{
    const courseName=props.name
    return(<div>
<h1>{courseName}</h1>
    </div>)
}

export default Header