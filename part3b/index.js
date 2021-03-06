const express = require('express')
var morgan = require('morgan')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
	tokens.body(req, res)
  ].join(' ')
}))

let persons = [
	{ 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	const numPeopleString = `<p>Phonebook has info for ${persons.length} people</p>`
	const dateString = `<p>${new Date()}</p>`
	response.send(numPeopleString + dateString)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
	response.json(person)
  } else {
	  response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	const nameList = persons.map(person => person.name)
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max))
	}
	
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Make sure to enter a name and a number'
		})
	}
	
	if (nameList.includes(body.name)) {
		return response.status(400).json({
			error: 'Name must be unique'
		})
	}
	
	const person = {
		name: body.name,
		number: body.number,
		id: getRandomInt(1000),
	}
	
	persons = persons.concat(person)
	
	response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>  {
	console.log(`Server running on ${PORT}`)
})