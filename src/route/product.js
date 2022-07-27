const express = require('express')
const router = express.Router()
const productContoller = require('../controler/product')
const { isLogin, isAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/fileHandler')

router
  .get('/', productContoller.getProduct)
  .get('/:id', productContoller.detailProduct)
  .post('/', isLogin, upload.single('photo'), productContoller.insertProduct)
  .put('/:id', isLogin, upload.single('photo'), productContoller.updateProduct)
  .put('/upload/:id', isLogin, isAdmin, upload.single('photo'), productContoller.insertPhoto)
  .delete('/:id', isLogin, productContoller.deleteProduct)

module.exports = router
