const pool = require('../config/pg')
const productModel = {
  delete: (id) => {
    return pool.query('DELETE FROM product WHERE product_id = $1', [id])
  },
  update: ({ price, stock, id }) => {
    return pool.query('UPDATE product SET price=$1, stock=$2 WHERE product_id=$3', [price, stock, id])
  },
  insert: (data) => {
    return pool.query('INSERT INTO product(product, price, stock, category_id)VALUES($1, $2, $3, $4)', [data.product, data.price, data.stock, data.category_id])
  },
  get: ({ sortby, limit, offset }) => {
    return pool.query('SELECT * FROM product ORDER BY $1 ASC LIMIT $2 OFFSET $3', [sortby, limit, offset])
  },
  search: (search) => {
    return pool.query('SELECT * FROM product WHERE product LIKE $1%', [search])
  }
}

module.exports = productModel
