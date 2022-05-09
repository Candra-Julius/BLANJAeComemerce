const express = require('express')
const router = express.Router()
const productContoller = require('../controler/product')

router
  .get('/', productContoller.getProduct)
  .post('/', productContoller.insertProduct)
  .put('/:id', productContoller.updateProduct)
  .delete('/:id', productContoller.deleteProduct)

module.exports = router
