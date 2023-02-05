const Header = ({ course }) => { 
  return <h2>{course}</h2>
}

const Total = ({ parts }) => {

var result = parts.reduce(function (acc, obj) { return acc + obj.exercises; }, 0);
console.log('result', result);

return <p> <b>Total of {result} exercies </b></p>

}

const Part = ({ part }) => {
  return(
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) =>{ return (
  <>
    
      {parts.map(part =><Part part={part}/>)} 
 
  </>
)}

const Course = ({courses}) =>{
  console.log('courses', courses)
  return(
  <div>
    {courses.map(
      course => {
        console.log('course', course)
      return(
      <>
       <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts ={course.parts}/>
      </>
      )
      }
       
    )}
      
  </div>
  )
}

export default Course;



