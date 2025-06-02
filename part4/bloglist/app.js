const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
