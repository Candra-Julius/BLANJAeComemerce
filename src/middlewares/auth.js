const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const auth = {
  isLogin: (req, res, next) => {
    try {
      let token
      if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
        console.log(decoded)
        req.payload = decoded
        console.log(req.payload.email)
        next()
      } else {
        res.json({
          message: 'You need to login to access this feature'
        })
      }
    } catch (error) {
      console.log(error)
      res.json({
        error
      })
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
  }
}

module.exports = auth
