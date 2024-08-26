  const Person = ({name, number}) => <li>Name: {name} Number: {number}</li>

  const Persons = (props) =>{
    return(
      <ul style={{listStyleType: 'none', padding: 0, margin: 0,}}>
        {props.persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
      </ul>
    )
  }

  export default Persons
