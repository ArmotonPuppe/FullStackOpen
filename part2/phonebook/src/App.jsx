import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

  

const App = () =>{ 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  const [newNotification, setNotification] = useState({message: null, type: ''})
  
  useEffect(()=>{
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const deletePersons = id =>{
    const personToDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personToDelete.name}`))
      personsService
        .deletePerson(id)
        .then(returnedPerson => {
          console.log('Deleted person', returnedPerson)
          setPersons(persons.filter(p=> p.id !== id))
        
        })
        .catch(error => {
          setNotification({
            message: `Information of ${personToDelete.name} has already been removed from the server`,
            type: 'error'
          })
          setTimeout(() => {
            setNotification({message: null, type: ''})
          }, 3000)
          setPersons(persons.filter(p=> p.id !== id))
        })
  }

  const addPerson = (event) =>{
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        console.log(person)
        const changedPerson = {...person, number: newNumber}
        personsService
          .update(person.id, changedPerson).then(returnedPerson => {
            console.log('Server returned', returnedPerson)
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNotification({
              message: `Updated number for ${returnedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification({message: null, type: ''})
            }, 3000)
          })
          .catch(error => {
            setNotification({
              message: `Information of ${changedPerson.name} has already been removed from the server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification({message: null, type: ''})
            }, 3000)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
        setNewName('')
        setNewNumber('')
      }   
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log('New person', personObject)
      personsService
        .create(personObject)
        .then(returnedPerson => {
          console.log('Set person', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNotification({
            message: `Added ${returnedPerson.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({message: null, type: ''})
          }, 3000)
          
          setNewName('')
          setNewNumber('')
          
        })
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
      <Notification message={newNotification.message} type={newNotification.type} />
      <div>debug: {newName}</div>
      <Filter handleChange={handleSearchChange} search={search}/>
      <h2>Phonebook</h2>
      <PersonForm handlePerson={addPerson} 
                  handleName={handleChange(setNewName)} 
                  handleNumber={handleChange(setNewNumber)}
                  name={newName}
                  number={newNumber}/>
      
      <h3>Numbers</h3>
      <Persons persons={filteredResults} handleDeletion={deletePersons}/>
    </div>
  )
}

export default App