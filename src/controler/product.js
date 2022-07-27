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
    if (!search && !sortby) {
      productModel.getall()
        .then((result) => {
          res.status(200).json({
            data: result.rows
          })
        })
    } else {
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
    }
  },
  insertProduct: async (req, res, next) => {
    try {
      const file = req.file
      console.log(file)
      // eslint-disable-next-line camelcase
      const { name, price, stock, category_id, status, desc } = req.body
      const data = {
        id: uuidv4(),
        name,
        price,
        stock,
        photo: `http:://localhost:4000/image/${file.filename}`,
        // eslint-disable-next-line camelcase
        category_id,
        status,
        desc
      }
      await productModel.insert(data)
      res.status(200).json({
        message: 'items added',
        data
      })
    } catch (error) {
      console.log(error)
      next(new createError[500]())
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const file = req.file
      console.log(file)
      const photo = file.filename
      const route = 'product'
      const { price, stock, status, desc } = req.body
      const id = req.params.id
      const data = {
        price,
        stock,
        photo: `http:://localhost:4000/image/${photo}`,
        status,
        desc,
        id
      }
      const checkById = validating.productIdCheck(route, id)
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
      console.log(file)
      const photo = file.filename
      console.log(photo)
      const id = req.params.id
      await productModel.insertPhoto(photo, id)
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
      const checkById = await validating.productIdCheck(route, id)
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
