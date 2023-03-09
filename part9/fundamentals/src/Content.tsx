import Part from "./Part"
import CoursePart from "./types"

interface ContentProps{
    courseParts: CoursePart[]
}


const Content = (props: ContentProps) =>{
    const courseParts=props.courseParts
    return (<div>
        {courseParts.map(coursePart=>
            <Part key={coursePart.name} coursePart={coursePart}/>)}
       
    </div>)
}

export default Content