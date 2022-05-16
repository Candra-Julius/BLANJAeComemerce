const createError = require('http-errors')
const productModel = require('../modul/product')
const validating = require('../modul/validate')
const { v4: uuidv4 } = require('uuid')

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
  insertProduct: async (req, res, next) => {
    try {
      // const file = req.file
      // console.log(file)
      // eslint-disable-next-line camelcase
      const { name, price, stock, category_id } = req.body
      const data = {
        id: uuidv4(),
        name,
        price,
        stock,
        // eslint-disable-next-line camelcase
        category_id
        // photo: file.filename
      }
      await productModel.insert(data)
      res.status(200).json({
        message: 'items added'
      })
    } catch (error) {
      next(new createError[500]())
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const route = 'product'
      const { price, stock } = req.body
      const id = req.params.id
      const data = {
        price,
        stock,
        id
      }
      const checkById = validating.idCheck(route, id)
      if (!(await checkById).rowCount) {
        res.status(400).json({
          message: 'data doesn\'t exist'
        })
      } else {
        await productModel.update(data)
        res.json({
          message: 'data has been updated',
          data
        })
      }
    } catch (error) {
      console.log(error)
      next(new createError[500]())
    }
  },
  insertPhoto: async (req, res, next) => {
    try {
      const file = req.file
      const id = req.params.id
      await productModel.insertPhoto(file, id)
      res.status(200).json({
        message: 'photo added'
      })
    } catch (error) {
      next(createError[400]())
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const route = 'product'
      const id = req.params.id
      const checkById = validating.idCheck(route, id)
      if (!(await checkById).rowCount) {
        res.status(400).json({
        // eslint-disable-next-line quotes
          message: `data doesn't exist`
        })
      } else {
        await productModel.delete(id)
        res.status(200).json({
          message: 'data has been deleted'
        })
      }
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  detailProduct: async (req, res, next) => {
    try {
      const id = req.params.id
      const { rows: [result] } = await productModel.detailProduct(id)
      res.status(200).json({
        result
      })
    } catch (error) {
      next(createError[500]())
    }
  }
}

module.exports = productContoller
