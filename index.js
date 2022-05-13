// declaration
require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const versioning = require('./src/route/index')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// routing
app.use('/v1', versioning)

// error handling
app.all('*', (req, res, next) => {
  next(new createError[404]())
})

app.use((err, req, res, next) => {
  const messError = err.message
  const statusError = err.status

  res.status(statusError).json({
    message: messError
  })
})

// port
app.listen(PORT, () => {
  console.log(`Port ${PORT} is running`)
})
