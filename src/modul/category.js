const pool = require('../config/pg')
const categoryModel = {
  get: ({ limit, offset }) => {
    return pool.query(`SELECT * FROM category LIMIT ${limit} OFFSET ${offset}`)
  },
  insert: ({ name }) => {
    return pool.query('INSERT INTO category(name)VALUES($1)', [name])
  },
  update: ({ name, id }) => {
    return pool.query('UPDATE category SET name=$1 WHERE id=$2', [name, id])
  },
  delete: (id) => {
    return pool.query('DELETE FROM category WHERE id = $1', [id])
  },
  search: (search) => {
    return pool.query(`SELECT * FROM category WHERE name ILIKE ('%${search}%')`)
  },
  getall: () => {
    return pool.query('SELECT * FROM category')
  }
}

module.exports = categoryModel
