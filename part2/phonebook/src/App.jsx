import { useState } from 'react'
const Filter = ({handleChange, search}) => (
  <div>
    <label>
      <Input text='filter shown with' handleChange={handleChange} value={search}/>
    </label>
  </div>
)
const PersonForm = (props) => (
    <form onSubmit={props.handlePerson}>
        <Input text='Name' handleChange={props.handleName} value={props.name}/>
        <Input text='Number' handleChange={props.handleNumber} value={props.number}/>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

const Input = ({text, handleChange, value}) =>(
  <div>{text}: <input value={value} onChange={handleChange}/></div>
)
const Persons = (props) =>{
  return(
    <ul style={{listStyleType: 'none', padding: 0, margin: 0,}}>
      {props.persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </ul>
  )
}
const Person = ({name, number}) => <li>Name: {name} Number: {number}</li>

  

const App = () =>{ 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  
  
  const addPerson = (event) =>{
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log('New person', personObject)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('Default name state', newName)
    }
  }
  
  const handleChange = (setValue) => (
    (event)=>{
      console.log(event.target.value)
      setValue(event.target.value)
    }
  )
  
  
  const handleSearchChange = (event) =>{
    console.log('event target value:', event.target.value)
    setSearch(event.target.value)
    setIsFilter(event.target.value!=='')
    console.log('Search is: ', search)
  }
  const filteredResults = isFilter
    ? persons.filter(person=>person.name.toLowerCase().includes(search.toLowerCase()))
    : persons
  
   
  return (
    <div>
      <div>debug: {newName}</div>
      <Filter handleChange={handleSearchChange} search={search}/>
      <h2>Phonebook</h2>
      <PersonForm handlePerson={addPerson} 
                  handleName={handleChange(setNewName)} 
                  handleNumber={handleChange(setNewNumber)}
                  name={newName}
                  number={newNumber}/>
      
      <h3>Numbers</h3>
      <Persons persons={filteredResults}/>
    </div>
  )
}

export default App