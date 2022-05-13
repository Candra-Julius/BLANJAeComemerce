const jwt = require('jsonwebtoken')

const common = {
  response: (res, result, status, message, pagination) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    if (pagination)resultPrint.pagination = pagination
    res.status(status).json(resultPrint)
  },
  generateToken: (payload) => {
    const expiresIn = {
      expiresIn: '30m',
      issuer: 'blanja'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, expiresIn)
    return token
  },
  generateRefreshToken: (payload) => {
    const expiresIn = { expiresIn: '1 day' }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, expiresIn)
    return token
  }
}

module.exports = common
