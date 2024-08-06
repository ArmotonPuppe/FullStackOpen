import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)
const MostVoted = (props) =>{
  return(
    <div>
      {props.anecdotes[props.mostVoted.index]} has {props.mostVoted.amount} votes
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({
    index: 0,
    amount: 0
  })
  
  const handleRandom = (length) => {
    const newSelected = getRandomInt(length)
    console.log('New selected', newSelected)
    setSelected(newSelected)
  }

  const getRandomInt = (max) =>{
    console.log(max)
    return Math.floor(Math.random() * max)
  }

  const handleVotes = () =>{
    const votesCopy = [...votes]
    console.log('Votes before', votes)
    votesCopy[selected] +=1
    if(votesCopy[selected]>mostVoted.amount){
      const newMostVoted = {...mostVoted}
      console.log('Old most voted', newMostVoted)
      newMostVoted.index = selected
      newMostVoted.amount = votesCopy[selected]
      console.log('New most voted', newMostVoted)
      setMostVoted(newMostVoted)
    }
    console.log('Votes after', votesCopy)
    setVotes(votesCopy)
  }
  
  return (
    <div>
      <Header text='Anecdote of the day'/>
      {anecdotes[selected]}
      <br></br>
      <Button handleClick={()=>handleRandom(anecdotes.length)} text='next anecdote'/>
      <Button handleClick={handleVotes} text='vote'/>
      <Header text='Anecdote with most votes'/>
      <MostVoted anecdotes={anecdotes} mostVoted = {mostVoted}/>
    </div>
  )
}

export default App