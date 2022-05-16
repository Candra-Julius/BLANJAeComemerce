const express = require('express')
const router = express.Router()
const purchaseController = require('../controler/purchase')

router
  .get('/', purchaseController.getPurchase)
  .post('/:id', purchaseController.insertPurchase)
  .put('/:id', purchaseController.decreaseQty)
  .delete('/:id', purchaseController.deletePurchase)

module.exports = router
