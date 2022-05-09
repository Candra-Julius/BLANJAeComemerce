const pool = require('../config/pg')
const purchaseModul = {
  get: () => {
    return pool.query('select * from purchase')
  },
  insert: (id) => {
    return pool.query('insert into purchase(product_id, price) select product_id, price from product where product_id=$1', [id])
  },
  delete: (id) => {
    return pool.query('DELETE FROM purchase WHERE product_id = $1', [id])
  }
}

module.exports = purchaseModul
