const createError = require('http-errors')
const categoryModel = require('../modul/category')
const categoryControler = {
  getCategory: (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const search = req.query.search
    if (search) {
      categoryModel.search(search)
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
      categoryModel.get({ limit, offset })
        .then((result) => {
          res.status(200).json({
            data: result.rows
          })
        })
        .catch((error) => {
          console.log(error)
          next(new createError[500]())
        })
    }
  },
  insertCategory: (req, res, next) => {
    const { name } = req.body
    categoryModel.insert({ name })
      .then(() => {
        res.status(201)
        res.json({
          message: 'input data success'
        })
      })
      .catch(() => {
        next(new createError[500]())
      })
  },
  updateCategory: (req, res, next) => {
    const { name } = req.body
    const id = req.params.id
    categoryModel.update({ name, id })
      .then(() => {
        res.json({
          message: 'data has been updated'
        })
      })
      .catch(() => {
        next(new createError[500]())
      })
  },
  deleteCategory: (req, res, next) => {
    const id = req.params.id
    categoryModel.delete(id)
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

module.exports = categoryControler
