import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

  

const App = () =>{ 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  
  useEffect(()=>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

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