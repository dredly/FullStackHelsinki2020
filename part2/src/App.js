import React, { useState } from 'react'

const Person = ({personObj}) => (<div>{personObj.name}</div>)

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas' }
	])
	const [ newName, setNewName ] = useState('')
	
	const addPerson = (event) => {
		const nameList = persons.map(person => person.name)
		console.log(nameList)
		event.preventDefault()
		if (!nameList.includes(newName)) { 
			const personObject = {
				name: newName,
			}
			setPersons(persons.concat(personObject))
			setNewName('')
		}
		else {window.alert(`${newName} is already added to phonebook`)}
	}
	
	const handlePerson = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}
	
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handlePerson}/>
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