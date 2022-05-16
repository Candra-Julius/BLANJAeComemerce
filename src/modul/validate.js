const pool = require('../config/pg')

const validating = {
  idCheck: (route, id) => {
    return pool.query(`SELECT * FROM ${route} WHERE id = ${id}`)
  }
}

module.exports = validating
