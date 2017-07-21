const router = require('koa-router')()
const device = require('../controllers/device')

router.get('/device/get_device_details',device.getEachDeviceDetails)
router.get('/device/device_register',device.deviceRegister)
router.get('/device/device_management',device.deviceManagement_all)
router.get('/device/device_management_address',device.deviceManagement_address)
router.get('/device/device_management_updatenumindex',device.deviceManagement_number)
router.get('/device/deviceManagement_updatenum',device.deviceManagement_updateNum)
router.get('/device/deviceManagement_updateprice',device.deviceManagement_setprice)
router.get('/device/deviceManagement_updatestock',device.deviceManagement_updatestock)
router.post('/device/deviceManagement_updateremarks',device.deviceManagement_updateremarks)
router.get('/device/deviceManagement_offline',device.deviceManagement_offline)
router.get('/device/deviceManagement_online',device.deviceManagement_online)

module.exports = router