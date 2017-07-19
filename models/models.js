const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	cellphone: String,
	password: String,
	salt: String,
	email: String,
	name: String,
	openId: String,
	address: String,
	subUser: [{
		subAccount: String,
		subPassword: String,
		subName: String,
		subEmail: String
	}],
	bankcard: [{
		bankName: String,
		bankcardNumber: String
	}],
	deviceGroup: Array,
	time: String
})

const deviceSchema = mongoose.Schema({
	cellphone: String,
	deviceType: String,
	deviceId: String,
	deviceNumber: Number,
	deviceActive: String,
	store: String,
	address: String,
	price: String,
	remarks: String,
	presentType: String,
	stock: Number,
	time: String
})

const orderSchema = mongoose.Schema({
	cellphone: String,
	deviceId: String,
	openId: String,
	type: String,//onlinePayment,adsRevenue,cash
	price: Number,
	time: String
})

const userInfo = mongoose.model('userInfo',userSchema)
const deviceInfo = mongoose.model('deviceInfo',deviceSchema)
const orderInfo = mongoose.model('orderInfo',orderSchema)

module.exports = {
	userInfo,
	deviceInfo,
	orderInfo
}