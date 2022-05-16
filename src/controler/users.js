const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const usersmodel = require('../modul/users')
const common = require('../helper/common')
const validate = require('../modul/validate')
const jwt = require('jsonwebtoken')
const { accActivation } = require('../helper/sendEmail')

const usersController = {
  register: async (req, res, next) => {
    try {
      const { email, password, fullname, role } = req.body
      const { rowCount } = await usersmodel.findByEmail(email)
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      if (rowCount > 0) {
        next(createError[403]('Email already used'))
      } else {
        const data = {
          id: uuidv4(),
          email,
          hash,
          fullname,
          role
        }
        accActivation(data)
        await usersmodel.insert(data)
        res.status(201).json({
          message: `wellcome ${fullname} please check your email to activate your account`
        })
      }
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { rows: [user] } = await usersmodel.findByEmail(email)
      if (!user) {
        res.status(403).json({
          message: 'Wrong email or password'
        })
      }
      const passvalidate = bcrypt.compareSync(password, user.password)
      if (!passvalidate) {
        res.status(403).json({
          message: 'Wrong email or password'
        })
      }
      // generate token
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      }
      user.token = common.generateToken(payload)
      user.refreshToken = common.generateRefreshToken(payload)
      delete user.password
      res.status(200).json({
        message: `wellcome back ${user.fullname}`
      })
      console.log(user)
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  profile: async (req, res, next) => {
    try {
      const email = req.payload.email
      const file = req.file
      console.log(file)
      if (req.file) {
        const photo = file.filename
        console.log(photo)
        await usersmodel.changeAvatar(photo, email)
      }
      const { rows: [profile] } = await usersmodel.findByEmail(email)
      delete profile.password
      res.status(200).json({
        data: profile
      })
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  delete: async (req, res, next) => {
    try {
      const route = 'users'
      const id = req.params.id
      console.log(id)
      const checkById = await validate.checkById(route, id)
      if (!checkById.rowCount) {
        res.status(400).json({
          message: 'data doesnt exist'
        })
      } else {
        await usersmodel.delete(id)
        res.status(200).json({
          message: 'acount deleted'
        })
      }
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  userData: async (req, res, next) => {
    try {
      const data = await usersmodel.getData()
      res.status(200).json({
        data: data.rows
      })
    } catch (error) {
      console.log(error)
      next(createError[500]())
    }
  },
  refreshToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken
    const payload = jwt.sign(refreshToken, process.env.SECRET_KEY_JWT)
    console.log(payload)
  },
  activation: async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    await usersmodel.activation(id)
    res.status(200).json({
      message: 'your account has been activated. you can login as you wish from now on '
    })
  }
}

module.exports = usersController
