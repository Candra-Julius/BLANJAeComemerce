const express = require('express')
const router = express.Router()
const usersController = require('../controler/users')
const auth = require('../middlewares/auth')

router
  .post('/register', usersController.register)
  .post('/login', usersController.login)
  .get('/profile', auth.isLogin, usersController.profile)
  .get('/', auth.isLogin, auth.isAdmin, usersController.userData)
  .delete('/:id', auth.isLogin, auth.isAdmin, usersController.delete)

module.exports = router
