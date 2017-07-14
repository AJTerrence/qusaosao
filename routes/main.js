const router = require('koa-router')()
const device = require('../controllers/device')

router.get('/device/get_device_details',device.getEachDeviceDetails)
router.get('/device/device_register',device.deviceRegister)
router.get('/device/device_management',device.deviceManagement_all)

module.exports = router