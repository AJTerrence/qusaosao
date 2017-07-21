const order = require('../controllers/order')
const router = require('koa-router')()

router.get('/v1/order/create_order',order.createOrder)
router.get('/v1/income/income_statistics',order.incomeStatistics)
router.get('/test',order.test)

module.exports = router