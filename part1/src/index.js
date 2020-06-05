import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({headerText}) => (<h1>{headerText}</h1>)	

const Button =({ onClick, text }) => (
	<button onClick={onClick}>	
		{text}
	</button>
)

const Stat = ({ statText, statNum }) => (<p>{statText} {statNum}</p>)

const Statistics = ({ good, neutral, bad }) => {
	const All = () => (good + neutral + bad)
	const Avg = () => ((good - bad) / (good  + neutral + bad))
	const Positive = () => 
		((100 * (good / (good + neutral + bad))).toString() + '%')
	
	if (good + neutral + bad === 0) {
		return (
			<p>No feedback given</p>
		)
	}
	
	return (	
		<>
			<Stat statText='good' statNum={good} />
			<Stat statText='neutral' statNum={neutral} />
			<Stat statText='bad' statNum={bad} />
			<Stat statText='All' statNum={All()} />
			<Stat statText='Average' statNum={Avg()} />
			<Stat statText='Positive' statNum={Positive()} />
		</>
	)
}
	
const App = () => {
	// Save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const addGood = () => setGood(good + 1)
	const addNeutral = () => setNeutral(neutral + 1)
	const addBad = () => setBad(bad + 1)
	
	return (
		<div>
			<Header headerText='give feedback' />
			<Button onClick={addGood} text='good' />
			<Button onClick={addNeutral} text='neutral' />
			<Button onClick={addBad} text='bad' />
			<Header headerText='statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)





