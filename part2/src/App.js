import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({countryObj}) => (<div>{countryObj.name}</div>)

const CountryCollapsed = ({countryObj, expanded, setExpanded}) => {
	
	return (
		<div>
			{`${countryObj.name} `}  
			<button onClick={() => setExpanded(expanded.concat({countryObj}))} >
				show
			</button>
		</div>
	)
}

const CountryExpanded =({ countryObj, expanded }) => {
	const countryName = countryObj.name
	const countryNames = expanded.map(country => country.countryObj.name)	
	if (countryNames.includes(countryName)) {
		return(<CountryInfo countryObj={countryObj} />)	
	}
	else {
		return(<></>)
	}
		
}

const Filter = ({ searchTerm, handleSearch }) => (
	<div>
		find countries: <input value={searchTerm} onChange={handleSearch} />
	</div>
)

const CountryInfo =({countryObj}) => {
	const [ weather, setWeather ] = useState([])
	const api_key = process.env.REACT_APP_API_KEY
	const weatherLink = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryObj.capital}`
	
	const weatherHook = () => {
		console.log('effect')
		axios
			.get(weatherLink)
			.then(response => {
				console.log('promise fulfilled')
				setWeather(response.data)
			})
	}
	
	useEffect(weatherHook, [])
	console.log(weather['current'])
	console.log(typeof weather['current'])
	
	// Extract relevant values from the json object
	const temp = ((weather || {}).current || {}).temperature
	const windSpeed = ((weather || {}).current || {}).wind_speed
	const windDir = ((weather || {}).current || {}).wind_dir
	const imgLink = weather && weather.current ? weather.current.weather_icons[0] : null
	
	return (
		<div>
			<h1>{countryObj.name}</h1>
			<div>capital {countryObj.capital}</div>
			<div>population {countryObj.population}</div>
			<h2>Languages</h2>
			<ul>
				{countryObj.languages.map(language => 
					<li key={language.iso639_2}>{language.name}</li>)}
			</ul>
			<img src={countryObj.flag} alt={`${countryObj.demonym} flag`} 
				width="150" />
			<h2>Weather in {countryObj.capital}</h2>
			<div>
				<strong>temperature: </strong>{temp} Celsius
			</div>
				<img src={imgLink} alt='Weather icon' 
					width="70" />
			<div>
				<strong>wind: </strong>{windSpeed} kph direction {windDir}
			</div>
			<p></p>
		</div>
	)
}

const SearchResults = ({countriesToShow}) => {
	const [ expanded, setExpanded ] = useState([])
	console.log(expanded)
	
	if (countriesToShow.length <= 10) {
		if (countriesToShow.length > 1) {
			return(
				<div>
					{countriesToShow.map(country => (
					<div key={country.alpha3Code}>	
						<CountryCollapsed countryObj={country} expanded={expanded} setExpanded={setExpanded} />
						<CountryExpanded countryObj={country} expanded={expanded} />
					</div>
					))}
				</div>
			)
		}
		else if (countriesToShow.length === 1) {
			const countryObj = countriesToShow[0]
			return(
				<CountryInfo countryObj={countryObj} />
			)
		}
		else {
			return(<div>No matches</div>)
		}
	}
	else {
		return(<div>Too many matches, specify another filter</div>)
	}
}

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ searchTerm, setSearchTerm ] = useState('')
	
	const hook = () => {
		console.log('effect')
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}
	
	useEffect(hook, [])
	
	const handleSearch = (event) => {
		console.log(event.target.value)
		setSearchTerm(event.target.value)
	}
	
	const countriesToShow = countries.filter(country => country.name.includes(searchTerm))
		console.log(countriesToShow)
	
	return (
		<div>
			<Filter searchTerm={searchTerm} handleSearch={handleSearch} />
			<SearchResults countriesToShow={countriesToShow} />
		</div>
	)	
}

export default App