import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({personObj}) => (<div>{personObj.name} {personObj.number}</div>)

const Filter = ({ searchTerm, handleSearch }) => (
	<div>
		filter shown with: <input value={searchTerm} onChange={handleSearch} />
	</div>
)

const Form = ({ addPerson, newName, handlePerson, newNumber, handleNumber }) => (
	<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} onChange={handlePerson}/>
		</div>
		<div>
			number: <input value={newNumber} onChange={handleNumber}/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newNumber, setNewNumber ] = useState('')
	const [ newName, setNewName ] = useState('')
	const [ searchTerm, setSearchTerm ] = useState('')
	
	useEffect(() => {
		personService
			.getAll()
				.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])
	
	const addPerson = (event) => {
		const nameList = persons.map(person => person.name)
		console.log(nameList)
		event.preventDefault()
		if (!nameList.includes(newName)) { 
			const personObject = {
				name: newName,
				number: newNumber,
			}
			personService
				.create(personObject)
					.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
		}
		else {window.alert(`${newName} is already added to phonebook`)}
	}
	
	const handlePerson = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}
	
	const handleNumber = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}
	
	const handleSearch = (event) => {
		console.log(event.target.value)
		setSearchTerm(event.target.value)
	}
	
	const personsToShow = persons.filter(person => person.name.includes(searchTerm))
		console.log(personsToShow)
	
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchTerm={searchTerm} handleSearch={handleSearch} />
			<h2>add a new</h2>
			<Form addPerson={addPerson} newName={newName} handlePerson={handlePerson} 
				newNumber={newNumber} handleNumber={handleNumber}/>
			<h2>Numbers</h2>
				{personsToShow.map(person => <Person key={person.name} personObj={person} />)}
		</div>
	)	
}

export default App 