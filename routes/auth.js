const router = require('koa-router')()
const user = require('../controllers/user')

router.get('v1/user/get_verify_code',user.getVerifyCode)
router.post('v1/user/register_by_cellphone',user.register)
router.post('v1/user/login_by_cellphone',user.login)

module.exports = router