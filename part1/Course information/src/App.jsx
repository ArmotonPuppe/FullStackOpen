const Header = ({name}) =>{
  console.log(name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}
const Part = ({part}) =>{
  const {name, exercises} = part
  console.log(name, exercises)
    return (
    <>
      <p>{name}. Exercises: {exercises}</p>
    </>
    )
}
const Content = ({parts}) =>{
  const [part1, part2, part3] = parts
  console.log(parts)
  
  

  return (
    <div>
      <Part part = {part1}/>
      <Part part = {part2}/>
      <Part part = {part3}/>
    </div>
  )
}
const Total = ({parts}) => {
  console.log(parts)
  const totalExcercises = parts => {
    console.log(parts)
    return parts[0].exercises + parts[1].exercises + parts[2].exercises
  }
  return (
  <div>
    <p>Number of exercises: {totalExcercises(parts)} </p>
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
      <Header name={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>  
    </div>
  )
}

export default App