  const Person = ({name, number, handleDeletion}) => (
    <li>Name: {name} Number: {number}
        <button onClick={handleDeletion}>delete</button>
    </li>)

  const Persons = ({persons, handleDeletion}) =>{
    return(
      <ul style={{listStyleType: 'none', padding: 0, margin: 0,}}>
        {persons.map(person => <Person key={person.name} name={person.name} number={person.number} handleDeletion={() => handleDeletion(person.id)}/>)}
      </ul>
    )
  }

  export default Persons
