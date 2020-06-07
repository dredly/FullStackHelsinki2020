import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({headerText}) => (<h1>{headerText}</h1>)

const Button =({ onClick, text }) => (
	<button onClick={onClick}>	
		{text}
	</button>
)

const DispAnec = ({ anec, score }) => (
	<>
		<p>{anec}</p>
		<p>Has {score} votes</p>
	</>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const pointsInit = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  const [points, setPoints] = useState(pointsInit)
 
  const handleNext = () => {
	  const randomSelect = setSelected(Math.floor(Math.random()*anecdotes.length))
	  return (randomSelect)
  }
  
  const handleVote = () => {
	  const copy = [...points]
	  copy[selected] += 1
	  setPoints(copy)
	  return (points)
  }
  
  const findMost = () => {
	  const copy = [...points]
	  console.log(copy)
	  let max = Math.max.apply(Math, copy)
	  console.log(max)
	  console.log(copy.indexOf(max))
	  return (copy.indexOf(max))
  }
  
  return (
	<div>
	  <Header headerText="Anecdote of the day" />
	  <DispAnec anec={anecdotes[selected]} score={points[selected]} />
	  <div>
		<Button onClick={handleNext} text='next anecdote' />
		<Button onClick={handleVote} text='Vote for this anecdote' />
	  </div>
	  <Header headerText="Anecdote with most votes" />
	  <DispAnec anec={anecdotes[findMost()]} score={points[findMost()]}/>
    </div>		
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)





