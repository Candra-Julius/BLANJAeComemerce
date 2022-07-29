const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { findByEmail } = require('../modul/users')

const auth = {
  isLogin: (req, res, next) => {
    try {
      console.log('masuk isLogin')
      console.log(req.headers)
      let token
      if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
        console.log(decoded)
        req.payload = decoded
        console.log(req.payload.email)
        next()
      } else {
        next(createError[502]('you need to log in to access this feature'))
      }
    } catch (error) {
      console.log(error)
    }
  },
  isAdmin: (req, res, next) => {
    if (req.payload.role !== 'admin') {
      return next(createError[401]('Only Admin can do this request.'))
    } else {
      next()
    }
  },
  isCustomer: (req, res, next) => {
    if (req.payload.role !== 'seller') {
      return next(createError[401]('Only seller can do this request'))
    } else {
      next()
    }
  },
  isActive: async (req, res, next) => {
    try {
      const email = req.payload.email
      const { rows: [data] } = await findByEmail(email)
      if (data.status !== 1) {
        return next(createError[401]('please check your email  to activate your account'))
      } else {
        next()
      }
    } catch (error) {
      next(createError[404]('user not found'))
    }
  }
}

module.exports = auth
