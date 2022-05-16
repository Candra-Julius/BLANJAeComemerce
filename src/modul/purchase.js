const pool = require('../config/pg')
const purchaseModul = {
  get: (id) => {
    return pool.query('select * from purchase WHERE id = ($1)', [id])
  },
  insertProd: (id, product, qty) => {
    return pool.query('INSERT INTO purchase (id, product, qty) VALUES ($1, $2, $3)', [id, product, qty])
  },
  delete: (id, product) => {
    return pool.query('DELETE FROM purchase WHERE id = $1 AND product = $2', [id, product])
  },
  checkProd: (id, product) => {
    return pool.query('SELECT product FROM purchase WHERE id = $1 and product = $2', [id, product])
  },
  updateProd: (qty, id, product) => {
    return pool.query('UPDATE purchase SET qty = $1 where id = $2 and product = $3', [qty, id, product])
  },
  checkQty: (id, product) => {
    return pool.query('SELECT * FROM purchase WHERE id = $1 and product = $2', [id, product])
  },
  basket: (id) => {
    return pool.query('SELECT id, product, name, qty, category_id, photo, price FROM purchase INNER JOIN product ON product = product_id WHERE id = $1', [id])
  }
}

module.exports = purchaseModul
