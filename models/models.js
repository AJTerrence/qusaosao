const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	account: String,
	password: String,
	salt: String,//秘钥
	email: String,
	name: String,
	openid: String,//微信openId
	address: String,
	subUser: [{//子账号信息
		subAccount: String,
		subPassword: String,
		subName: String,
		subEmail: String
	}],
	bankcard: [{//银行卡信息
		bankName: String,
		bankcardNumber: String
	}],
	deviceGroup: Array,//设备ID集合
	create_at: String
})

const deviceSchema = mongoose.Schema({
	account: String,
	deviceType: String,
	deviceId: String,
	deviceNumber: Number,
	deviceActive: String,//状态
	store: String,//店名
	address: String,//地址
	price: Number,
	remarks: String,
	presentType: String,//礼品类型
	stock: Number,//库存
	create_at: String
})

const orderSchema = mongoose.Schema({
	account: String,
	deviceId: String,
	openid: String,
	type: String,//onlinePay,ads,cash
	price: Number,
	create_at: String
})

const userInfo = mongoose.model('userInfo',userSchema)
const deviceInfo = mongoose.model('deviceInfo',deviceSchema)
const orderInfo = mongoose.model('orderInfo',orderSchema)

module.exports = {
	userInfo,
	deviceInfo,
	orderInfo
}