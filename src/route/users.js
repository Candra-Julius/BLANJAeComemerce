const express = require('express')
const router = express.Router()
const usersController = require('../controler/users')
const auth = require('../middlewares/auth')
const { upload } = require('../middlewares/fileHandler')

router
  .post('/register', usersController.register)
  .post('/login', usersController.login)
  .post('/refreshToken', usersController.refreshToken)
  .get('/activate/:token/:id', usersController.activation)
  .put('/profile', auth.isLogin, auth.isActive, upload.single('avatar'), usersController.profile)
  .get('/profile', auth.isLogin, auth.isActive, usersController.profile)
  .get('/', auth.isLogin, auth.isAdmin, usersController.userData)
  .delete('/:id', auth.isLogin, auth.isAdmin, usersController.delete)

module.exports = router
