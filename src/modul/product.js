const pool = require('../config/pg')
const productModel = {
  delete: (id) => {
    return pool.query('DELETE FROM product WHERE product_id = $1', [id])
  },
  update: ({ price, stock, id }) => {
    return pool.query('UPDATE product SET price=$1, stock=$2 WHERE product_id = $3', [price, stock, id])
  },
  insert: (data) => {
    return pool.query('INSERT INTO product(product_id, name, price, stock, category_id)VALUES($1, $2, $3, $4, $5)', [data.id, data.name, data.price, data.stock, data.category_id])
  },
  get: ({ sortby, limit, offset }) => {
    return pool.query(`SELECT * FROM product ORDER BY ${sortby} ASC LIMIT ${limit} OFFSET ${offset}`)
  },
  search: (search) => {
    return pool.query('SELECT * FROM product WHERE name ILIKE $1', [search])
  },
  insertPhoto: (photo, id) => {
    return pool.query('UPDATE product SET photo = $1 WHERE product_id = $2', [photo, id])
  },
  detailProduct: (id) => {
    return pool.query('SELECT * FROM product where product_id = $1', [id])
  }
}

module.exports = productModel
