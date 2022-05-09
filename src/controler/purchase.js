const createError = require('http-errors')
const purchaseModul = require('../modul/purchase')

const purchaseController = {
  getPurchase: (req, res, next) => {
    purchaseModul.get()
      .then((result) => {
        res.json({
          data: result.rows
        })
      }).catch((error) => {
        console.log(error)
        next(new createError[500]())
      })
  },
  insertPurchase: (req, res, next) => {
    const id = req.params.id
    purchaseModul.insert(id)
      .then(() => {
        res.json({
          message: 'item has been added'
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError[500]())
      })
  },
  deletePurchase: (req, res, next) => {
    const id = req.params.id
    purchaseModul.delete(id)
      .then(() => {
        res.json({
          message: 'items has been deleted'
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError[500]())
      })
  }
}

module.exports = purchaseController
