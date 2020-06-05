import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({headerText}) => (<h1>{headerText}</h1>)	

const Button =({ onClick, text }) => (
	<button onClick={onClick}>	
		{text}
	</button>
)

const Stats = ({ statText, statNum }) => (<p>{statText} {statNum}</p>)
	
const App = () => {
	// Save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const addGood = () => setGood(good + 1)
	const addNeutral = () => setNeutral(neutral + 1)
	const addBad = () => setBad(bad + 1)
	const All = () => (good + neutral + bad)
	const Avg = () => ((good - bad) / (good  + neutral + bad))
	const Positive = () => 
		((100 * (good / (good + neutral + bad))).toString() + '%')
	
	return (
		<div>
			<Header headerText='give feedback' />
			<Button onClick={addGood} text='good' />
			<Button onClick={addNeutral} text='neutral' />
			<Button onClick={addBad} text='bad' />
			<Header headerText='statistics' />
			<Stats statText='good' statNum={good} />
			<Stats statText='neutral' statNum={neutral} />
			<Stats statText='bad' statNum={bad} />
			<Stats statText='All' statNum={All()} />
			<Stats statText='Average' statNum={Avg()} />
			<Stats statText='Positive' statNum={Positive()} />
		</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)





