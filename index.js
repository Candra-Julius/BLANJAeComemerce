// declaration
require('dotenv').config()
const createError = require('http-errors')
const versioning = require('./src/route/index')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204
}))
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(xss())

// routing
app.use('/v1', versioning)
app.use('/image', express.static('./upload'))

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
