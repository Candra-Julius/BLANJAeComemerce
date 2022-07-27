const createError = require('http-errors')
const purchaseModul = require('../modul/purchase')

const purchaseController = {
  getPurchase: async (req, res, next) => {
    try {
      const id = req.payload.id
      const { rows } = await purchaseModul.basket(id)
      res.status(200).json({
        rows
      })
    } catch (error) {
      console.log(error)
      next(new createError[500]())
    }
  },
  insertPurchase: async (req, res, next) => {
    try {
      const product = req.params.id
      const id = req.payload.id
      console.log(`product: ${product}`)
      console.log(`id: ${id}`)
      const { rowCount } = await purchaseModul.get(id)
      console.log(`rows: ${rowCount}`)
      // console.log(`data: ${data.product}`)
      if (!rowCount) {
        await purchaseModul.insertProd(id, product, 1)
        res.status(200).json({
          message: 'item has been added'
        })
      } else {
        const { rowCount: isExist } = await purchaseModul.checkProd(id, product)
        if (!isExist) {
          await purchaseModul.insertProd(id, product, 1)
          res.status(200).json({
            message: 'item has been added'
          })
        } else {
          const { rows: [result] } = await purchaseModul.checkQty(id, product)
          const qty = result.qty + 1
          await purchaseModul.updateProd(qty, id, product)
          res.status(200).json({
            message: 'item has been updated',
            item: result.product,
            qty
          })
        }
      }
    } catch (error) {
      console.log(error)
      next(createError[400]())
    }
  },
  deletePurchase: (req, res, next) => {
    const product = req.params.id
    const id = req.payload.id
    purchaseModul.delete(id, product)
      .then(() => {
        res.json({
          message: 'items has been deleted'
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError[500]())
      })
  },
  decreaseQty: async (req, res, next) => {
    try {
      const product = req.params.id
      const id = req.payload.id
      const { rows: [result] } = await purchaseModul.checkQty(id, product)
      if (result.qty <= 1) {
        await purchaseModul.delete(id, product)
        res.status(200).json({
          message: 'items has been deleted'
        })
      } else {
        const qty = result.qty - 1
        await purchaseModul.updateProd(qty, id, product)
        res.status(200).json({
          message: 'items has been updated',
          qty
        })
      }
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  }
}

module.exports = purchaseController
