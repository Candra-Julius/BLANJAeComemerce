const express = require('express')
const router = express.Router()
const categoryControler = require('../controler/category')
const auth = require('../middlewares/auth')

router
  .get('/', categoryControler.getCategory)
  .post('/', auth.isLogin, auth.isAdmin, categoryControler.insertCategory)
  .put('/:id', auth.isLogin, auth.isAdmin, categoryControler.updateCategory)
  .delete('/:id', auth.isLogin, auth.isAdmin, categoryControler.deleteCategory)

module.exports = router
