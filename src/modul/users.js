const pool = require('../config/pg')

const usersmodel = {
  findByEmail: (email) => {
    return pool.query('SELECT * FROM users WHERE email = $1', [email])
  },
  insert: ({ id, fullname, role, hash, email }) => {
    return pool.query('INSERT INTO users(id, fullname, role, password, email, status) VALUES($1, $2, $3, $4, $5, 0)', [id, fullname, role, hash, email])
  },
  delete: (id) => {
    return pool.query('DELETE FROM users WHERE id = $1', [id])
  },
  getData: () => {
    return pool.query('SELECT id, fullname, role, email, avatar, status FROM users')
  },
  updateProfile: (data) => {
    return pool.query('UPDATE users SET fullname = $1, email= $2, gender= $3, phone= $4 WHERE id= $5', [data.fullname, data.email, data.gender, data.phone, data.id])
  },
  changeAvatar: (photo, email) => {
    return pool.query('UPDATE users SET avatar = $1 WHERE email = $2', [photo, email])
  },
  activation: (id) => {
    return pool.query('UPDATE users SET status = 1 where id = $1', [id])
  }
}
module.exports = usersmodel
