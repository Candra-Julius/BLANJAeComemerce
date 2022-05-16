const express = require('express')
const router = express.Router()
const categoryRouters = require('./category')
const purchaseRouters = require('./purchase')
const productRouters = require('./product')
const usersRouter = require('./users')
const auth = require('../middlewares/auth')
const { isActive } = require('../middlewares/auth')

router
  .use('/product', productRouters)
  .use('/category', categoryRouters)
  .use('/purchase', auth.isLogin, isActive, purchaseRouters)
  .use('/users', usersRouter)

module.exports = router
