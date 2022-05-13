const createError = require('http-errors')
const productModel = require('../modul/product')

const productContoller = {
  getProduct: (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const sortby = req.query.sortby
    const search = req.query.search
    if (search) {
      productModel.search(search)
        .then((result) => {
          res.status(200).json({
            data: result.rows
          })
        })
        .catch((error) => {
          console.log(error)
          next(new createError[500]())
        })
    } else {
      productModel.get({ sortby, limit, offset })
        .then((result) => {
          res.status(200)
          res.json({
            data: result.rows
          })
        })
        .catch((error) => {
          console.log(error)
          next(new createError[500]())
        })
    }
  },
  insertProduct: (req, res, next) => {
    // eslint-disable-next-line camelcase
    const { name, price, stock, category_id } = req.body
    const data = {
      name,
      price,
      stock,
      // eslint-disable-next-line camelcase
      category_id
    }
    productModel.insert(data)
      .then(() => {
        res.status(201)
        res.json({
          message: 'input data success',
          data
        })
      })
      .catch(() => {
        next(new createError[500]())
      })
  },
  updateProduct: (req, res, next) => {
    const { price, stock } = req.body
    const id = req.params.id
    const data = {
      price,
      stock,
      id
    }
    productModel.update(data)
      .then((result) => {
        res.json({
          message: 'data has been updated',
          data
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError[500]())
      })
  },
  deleteProduct: (req, res, next) => {
    const id = req.params.id
    productModel.delete(id)
      .then(() => {
        res.json({
          message: 'data has been deleted'
        })
      })
      .catch(() => {
        next(new createError[500]())
      })
  }
}

module.exports = productContoller
