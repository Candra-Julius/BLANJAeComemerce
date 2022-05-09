const express = require('express')
const router = express.Router()
const categoryControler = require('../controler/category')

router
  .get('/', categoryControler.getCategory)
  .post('/', categoryControler.insertCategory)
  .put('/:id', categoryControler.updateCategory)
  .delete('/:id', categoryControler.deleteCategory)

module.exports = router
