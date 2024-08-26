const Header = ({name}) => <h2>{name}</h2>

const Part = ({part}) =>{
    const {name, exercises} = part
    console.log(name, exercises)
      return (
      <>
        {name}. Exercises: {exercises}
      </>
      )
  }
  const Content = ({parts}) =>{
    console.log(parts)
    return (
      <ul>
        {parts.map(part => 
          <li key={part.id}>
            <Part part={part}/> 
          </li>)} 
      </ul>
    )
  }
  const Total = ({parts}) => {
    console.log(parts)
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <b>Total of {total} exercises </b>
    )
  }
const Course = (props) =>{
    console.log(props)
    return(
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }
export default Course