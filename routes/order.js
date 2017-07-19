const order = require('../controllers/order')
const router = require('koa-router')()

router.get('/order/create_order',order.createOrder)

module.exports = router