const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	account: String,
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
	account: String,
	deviceType: String,
	deviceId: String,
	deviceNumber: Number,
	deviceActive: String,
	store: String,
	address: String,
	remarks: String,
	time: String
})

const userInfo = mongoose.model('userInfo',userSchema)
const deviceInfo = mongoose.model('deviceInfo',deviceSchema)

module.exports = {
	userInfo,
	deviceInfo
}