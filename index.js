// declaration
require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const productRouters = require('./src/route/product')
const categoryRouters = require('./src/route/category')
const purchaseRouters = require('./src/route/purchase')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// routing
app.use('/product', productRouters)
app.use('/category', categoryRouters)
app.use('/purchase', purchaseRouters)

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
