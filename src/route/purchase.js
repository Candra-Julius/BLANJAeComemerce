const express = require('express')
const router = express.Router()
const purchaseController = require('../controler/purchase')
const auth = require('../middlewares/auth')

router
  .get('/', auth.isLogin, purchaseController.getPurchase)
  .post('/addtocart/:id', auth.isLogin, purchaseController.insertPurchase)
  .put('/:id', auth.isLogin, purchaseController.decreaseQty)
  .delete('/:id', auth.isLogin, purchaseController.deletePurchase)

module.exports = router
