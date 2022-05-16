const createError = require('http-errors')
const categoryModel = require('../modul/category')
const { idCheck } = require('../modul/validate')
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
  updateCategory: async (req, res, next) => {
    try {
      const route = 'category'
      const { name } = req.body
      const id = req.params.id
      const checkById = idCheck(route, id)
      if (!(await checkById).rowCount) {
        res.status(400).json({
          message: 'data doesn\'t exist'
        })
      } else {
        await categoryModel.update({ name, id })
        res.json({
          message: 'data has been updated'
        })
      }
    } catch (error) {
      console.log(error)
      next(new createError[500]())
    }
  },
  deleteCategory: async (req, res, next) => {
    const route = 'category'
    const id = req.params.id
    const checkById = idCheck(route, id)
    if (!(await checkById).rowCount) {
      res.status(400).json({
        message: 'data doesn\'t exist'
      })
    } else {
      await categoryModel.delete(id)
      res.status(200).json({
        message: 'data has been deleted'
      })
    }
  }
}

module.exports = categoryControler
