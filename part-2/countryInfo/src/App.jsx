import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SearchForm from './components/SearchForm'
import countryServices from './services/countryService'
import CountryListDisplay from './components/CountryListDisplay'
import Country from './components/Country'
import countryService from './services/countryService'
import weatherService from './services/weatherService'
import CapitalWeather from './components/CapitalWeather'

function App() {

  const [countries, setCountries] = useState([])
  const [refineSearch, setRefineSearch] = useState(false)
  const [matchedCountries, setMatchedCountries] = useState([])

  const [showCountry, setShowCountry] = useState('')
  const [capitalWeather, setCapitalWeather] = useState('')


  // get all country list and filter for search string
  const handleSearchStringChange = (event) => {
    console.log(`handle Search String Change ${event.target.value}`)
    let searchString = event.target.value
    if (countries.length <= 0) {

      console.log("calling countries api")
      countryServices.getAll(event.target.value)
        .then(countrylist => {
          setCountries(countrylist.data)
        })
    }

    console.log(countries)

    let matchingCountries = [];
    countries.filter(country => {
      console.log("filter", country.name.common)
      if (country.name.common.toLowerCase().includes(searchString.toLowerCase()))
        matchingCountries = matchingCountries.concat(country.name.common)

      if (matchingCountries.length > 10)
        setRefineSearch(true)
      else setRefineSearch(false)
    })

    setMatchedCountries(matchingCountries)
    if(matchingCountries.length === 1){
      console.log('=========== only one country found ===========')
      showSingleCountryInfo(matchingCountries[0])
    } else{
      setShowCountry('')
    }

  }

  // get single country info
  const handleShow = (event) => {
    console.log(`getting country infor: ${event.target.id}`)
    showSingleCountryInfo(event.target.id)
  }


  const showSingleCountryInfo = (countryName) => {
    countryService.getSingle(countryName).then((country) => {

      const countryObj = {
        name: country.data.name.common,
        capital: country.data.capital,
        area: country.data.area,
        languages: country.data.languages,
        flagpng: country.data.flags.png
      }

      setShowCountry(countryObj)
      return country
    }).then(country => {
      console.log("Weather... ", country.data.capitalInfo)
      const weatherObj = {}

      weatherService.getWeatherDataForCity(country.data.capitalInfo.latlng[0], country.data.capitalInfo.latlng[1])
        .then((weatherData) => {

          console.log("weatherData ===> " , weatherData)

          weatherObj.capital = country.data.capital
          weatherObj.temp = weatherData.data.current.temp
          weatherObj.wind = weatherData.data.current.wind_speed
          weatherObj.icon = weatherData.data.current.weather[0].icon
          setCapitalWeather(weatherObj)   
        })        
    } )
  }

  return (
    <div>
      <SearchForm onSearchStringChange={handleSearchStringChange} />
      {refineSearch ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        !showCountry && (<CountryListDisplay countryList={matchedCountries} onClick={handleShow} />
        )
      )}

      {showCountry ? (<Country country={showCountry} />) : <></>}   
      {showCountry && capitalWeather ? (<CapitalWeather weather={capitalWeather} />) : <></>} 

    </div>
  )
}

export default App
