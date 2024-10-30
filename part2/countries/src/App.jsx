import { useState, useEffect } from 'react'
import axios from 'axios'

const RenderCountries = ({countries}) => {
  if (countries.length>10)
    return (
      <div>
        Too many results. Refine your search.
      </div>
    )
  return (
    <div>
      {countries.length ===1
       ? <RenderSingleCountry name={countries[0].name.common} population={countries[0].population} area={countries[0].area} flag={countries[0].flags.png}/>
       : countries.map(c => <p>{c.name.common}</p>)}
    </div>
  )
}
const RenderSingleCountry = ({name, population, area, flag}) => {
  console.log(flag.toLowerCase())
  return(
    <div>
      Name: {name}
      Population: {population}
      Area: {area}
      Flag: {<img
              src={flag}
              alt={`Flag of ${name}`}
              width="200"
              height="100"/>}
    </div>
  )
}
const App = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState([])
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('fetching the countries')
          setCountries(response.data)
        })
      
  }, [])

  useEffect(() => {
    if(value){
      const countrySearch = countries.filter(
        c => c.name.common.toLowerCase().includes(value.toLowerCase()
        ))
      setSearch(countrySearch)
    }else{
      setSearch([])
    }

  }, [value, countries])

  const handleChange = (event) =>{
    setValue(event.target.value)
    console.log('value is', event.target.value)
  }

  return (
    <div>
      Country: <input value={value} onChange={handleChange}/>
      <RenderCountries countries={search}/>
    </div>
  )
}
  

export default App
