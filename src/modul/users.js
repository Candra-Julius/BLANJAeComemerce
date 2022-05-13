const pool = require('../config/pg')

const usersmodel = {
  findByEmail: (email) => {
    return pool.query('SELECT * FROM users WHERE email = $1', [email])
  },
  insert: ({ id, fullname, role, hash, email }) => {
    return pool.query('INSERT INTO users(id, fullname, role, password, email) VALUES($1, $2, $3, $4, $5)', [id, fullname, role, hash, email])
  },
  delete: (id) => {
    return pool.query('DELETE FROM users WHERE id = $1', [id])
  },
  getData: () => {
    return pool.query('SELECT id, fullname, role, email FROM users')
  }
}
module.exports = usersmodel
