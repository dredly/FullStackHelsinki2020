import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({ partName, exercises }) => (
	<>
		<p>{partName} {exercises}</p>
	</>
)

const Total = ({parts}) => {
	console.log({parts})
	const numExs = parts.map(part => part.exercises)
	const total = numExs.reduce((a, b) => a + b, 0)
	return (
		<>
			<strong>total of {total} exercises</strong>
		</>
	)
}

const Content = ({parts}) => (
	<>
		{parts.map(part => <Part key={part.id} partName={part.name} exercises = {part.exercises} />)}
		<Total parts={parts} />
	</>
)

const Header = ({headerName}) => (
	<>
		<h1>{headerName}</h1>
	</>
)

const Course = ({course}) => ( 
	<>
		<Header headerName={course.name} />
		<Content parts={course.parts} />
	</>
		
)

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			}
		]
	}
	
	return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))



