require('dotenv').config()
const express = require('express')
const Contact = require('./models/contact')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (req, res) {
  const body = JSON.stringify(req.body)
  return body || ' '
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.get('/info', (request, response) => {
  const date = new Date()
  Contact.find({}).then((contacts) => {
    response.send(
      `Phonebook has info for ${contacts.length} people <div>${date.toString()}</div>`
    )
  })
})
app.get('/api/persons', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((contact) => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact
    .save()
    .then((savedContact) => response.json(savedContact))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Contact.findById(request.params.id)
    .then((contact) => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact
        .save()
        .then((updatedContact) => response.json(updatedContact))
    })
    .catch((error) => next(error))
})
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
