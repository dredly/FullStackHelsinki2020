import React, { useState } from 'react'

const Person = ({personObj}) => (<div>{personObj.name} {personObj.number}</div>)

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' }
	])
	const [ newNumber, setNewNumber ] = useState('')
	const [ newName, setNewName ] = useState('')
	
	const addPerson = (event) => {
		const nameList = persons.map(person => person.name)
		console.log(nameList)
		event.preventDefault()
		if (!nameList.includes(newName)) { 
			const personObject = {
				name: newName,
				number: newNumber,
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
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
	
	return (
		<div>
			<h2>Phonebook</h2>
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
			<h2>Numbers</h2>
				{persons.map(person => <Person key={person.name} personObj={person} />)}
		</div>
	)
	
}

export default App