const express = require('express')
const router = express.Router()
const productContoller = require('../controler/product')
const { isLogin, isAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/fileHandler')

router
  .get('/', productContoller.getProduct)
  .get('/:id', productContoller.detailProduct)
  .post('/', isLogin, isAdmin, productContoller.insertProduct)
  .put('/:id', isLogin, isAdmin, productContoller.updateProduct)
  .put('/upload/:id', isLogin, isAdmin, upload.single('photo'), productContoller.insertPhoto)
  .delete('/:id', isLogin, isAdmin, productContoller.deleteProduct)

module.exports = router
