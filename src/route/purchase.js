const express = require('express')
const router = express.Router()
const purchaseController = require('../controler/purchase')

router
  .get('/', purchaseController.getPurchase)
  .post('/:id', purchaseController.insertPurchase)
  .delete('/:id', purchaseController.deletePurchase)

module.exports = router
