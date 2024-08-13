
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
  const Header = ({name}) => <h2>{name}</h2>

  return(
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}
const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <p key={course.id}>
          <Course course={course}/>
        </p>
      )}
    </div>
  )
}

export default App