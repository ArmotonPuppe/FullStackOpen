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

const RenderSingleCountry = ({name, capital, population, area, flag, temp, weatherIcon, wind}) => {
  
  return(
    <div>
      <p>Name: {name}</p>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Area: {area}</p>
      {<img
        src={flag}
        alt={`Flag of ${name}`}
        width="200"
        height="100"/>}
      <RenderWeather capital = {capital} temp = {temp} icon={weatherIcon} wind={wind}/>
    </div>
  )
}
const RenderWeather = ({capital, temp, icon, wind}) =>{
  return (
    <div>
      <p>Weather in {capital}</p>
      <p>Temperature: {temp} celsius </p>
      {<img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        width="100"
        height="100"/>}
      <p>Wind {wind} m/s</p>
    </div>
  )
}
const App = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState([])
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const testiTuuli = '100'
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
        ? (setCountry(countrySearch[0]), getWeather(countrySearch[0].capital))
        : (setSearch(countrySearch), setCountry(null))
    }else{
      setSearch([])
      setCountry(null)
    }

  }, [value, countries])

  const getWeather = (capital) =>{
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
      .then(response => {
        const {lat, lon} = response.data[0]
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
            console.log(response.data)
          })
      })
  }

  
  const showCountry = (country) =>{
    setCountry(country)
    setWeather(getWeather(country.capital))
  }
  const handleChange = (event) =>{
    setValue(event.target.value)
    console.log('value is', event.target.value)
  }
  
  return (
    <div>
      {console.log(weather)}
      Country: <input value={value} onChange={handleChange}/>
      {country && weather
        ? <RenderSingleCountry name={country.name.common} 
                               capital={country.capital} 
                               population={country.population} 
                               area={country.area} 
                               flag={country.flags.png} 
                               temp = {testiTuuli} 
                               weatherIcon = {testiTuuli}
                               wind = {testiTuuli}/>
        : <RenderCountries countries={search} showCountry = {showCountry}/>}
      
    </div>
  )
}
  

export default App
