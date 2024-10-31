import { useState, useEffect } from 'react'
import axios from 'axios'
const RenderCountries = ({countries, showCountry}) => {
  
  if (countries.length>10)
    return (
      <div>
        Too many results. Refine your search.
      </div>
    )
  return (
    <div>
      {countries.map(c => <p key={c.name.common}>{c.name.common}
                          <button onClick={()=>showCountry(c)}>show</button></p>)}
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
      countrySearch.length === 1
        ? setCountry(countrySearch[0])
        : (setSearch(countrySearch), setCountry(null))
    }else{
      setSearch([])
      setCountry(null)
    }

  }, [value, countries])

  
  const showCountry = (country) =>{
    setCountry(country)
  }
  const handleChange = (event) =>{
    setValue(event.target.value)
    console.log('value is', event.target.value)
  }

  return (
    <div>
      Country: <input value={value} onChange={handleChange}/>
      {country
        ? <RenderSingleCountry name={country.name.common} population={country.population} area={country.area} flag={country.flags.png}/>
        : <RenderCountries countries={search} showCountry = {showCountry}/>}
      
    </div>
  )
}
  

export default App
