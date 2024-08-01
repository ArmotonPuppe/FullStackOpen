const Header = (props) =>{
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) =>{
  const [part1, part2, part3] = props.parts
  console.log(props)
  
  const Part = (props) =>{
  console.log(props)
    return (
    <>
      <p>{props.part.name}. Exercises: {props.part.exercises}</p>
    </>
    )
  }

  return (
    <div>
      <Part part = {part1}/>
      <Part part = {part2}/>
      <Part part = {part3}/>
    </div>
  )
}
const Total = (props) => {
  console.log(props)
  const totalExcercises = parts => {
    console.log(parts)
    return parts[0].exercises + parts[1].exercises + parts[2].exercises
  }
  return (
  <div>
    <p>Number of exercises: {totalExcercises(props.parts)} </p>
  </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>  
    </div>
  )
}

export default App