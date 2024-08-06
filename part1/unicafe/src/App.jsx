import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)
const Header = ({text}) => <h1>{text}</h1>

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td> 
    <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.total==0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticsLine text = 'good' value = {props.good}/>
          <StatisticsLine text = 'bad' value = {props.bad}/>
          <StatisticsLine text = 'neutral' value = {props.neutral}/>
          <StatisticsLine text = 'all' value = {props.total}/>
          <StatisticsLine text = 'average' value = {(props.good-props.bad)/props.total}/>
          <StatisticsLine text = 'positive' value = {(props.good/props.total*100)}/>
        </tbody>
      </table>
    </div>
  )
}
const Average = ({good, bad, total}) => {
  return(
    (good-bad)/total
  )
}

const PercentageOf = ({good, total}) => {
  return(
    good/total*100
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  
  const handleGood = () => {
    console.log('good before', good)
    const updatedGood = good + 1
    console.log('good after', good)
    setGood(updatedGood)
    setTotal(updatedGood+bad+neutral)
  }

  const handleBad = () => {
    console.log('bad before', bad)
    const updatedBad = bad + 1
    console.log('bad after', bad)
    setBad(updatedBad)
    setTotal(updatedBad+good+neutral)
  }
  


  const handleNeutral = () => {
    console.log('neutral beofre', neutral)
    const updatedNeutral = neutral + 1
    console.log('neutral after', neutral)
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral+good+bad)
  }

  return (
    <div>
      <Header text='Give feedback'/>
      <br></br>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <Header text='statistics'/>
      <Statistics total = {total} good= {good} neutral={neutral} bad={bad}/>
      
      
    </div>
  )
}

export default App