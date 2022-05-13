const pool = require('../config/pg')
const purchaseModul = {
  get: (id) => {
    return pool.query('select * from purchase WHERE user_id = $1', [id])
  },
  insertProd: (id) => {
    return pool.query('INSERT INTO purchase(product_id, price) select product_id, price from product where product_id=$1', [id])
  },
  insertUser: (id) => {
    return pool.query('INSERT INTO purchase(user_id) SELECT id FROM users WHERE id = $1', [id])
  },
  delete: (id) => {
    return pool.query('DELETE FROM purchase WHERE product_id = $1', [id])
  }
}

module.exports = purchaseModul
