import CoursePart from "./types"

interface TypeProps{
    coursePart: CoursePart
}

const Part=(props: TypeProps)=>{
    const coursePart = props.coursePart
    let contentToDisplay:string

    switch(coursePart.kind){
        case "basic":
            contentToDisplay=`${coursePart.description}`
            break;
        case "group":
            contentToDisplay=`project exercises ${coursePart.groupProjectCount}`
            break;
        case "background":
            contentToDisplay=`${coursePart.description}, submit to ${coursePart.backroundMaterial}`
            break;
        case "special":
            contentToDisplay=`${coursePart.description}, required skills ${coursePart.requirements}`
            break;
        default:
            contentToDisplay=""

    }
    console.log(contentToDisplay)
        return(<div>
             <p>
        <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
      </p>
      <p>{contentToDisplay}</p>
        </div>)
}

export default Part