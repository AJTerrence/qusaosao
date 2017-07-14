const router = require('koa-router')()
const user = require('../controllers/user')

router.get('/user/get_verify_code',user.getVerifyCode)
router.get('/user/register_by_cellphone',user.register)
router.post('/user/login_by_cellphone',user.login)

module.exports = router