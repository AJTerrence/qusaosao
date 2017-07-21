const models = require('../models/models')
const _ = require('lodash')

const createOrder = async (ctx) => {
	const deviceId = ctx.query.deviceId
	const openid = ctx.query.openid
	const type = ctx.query.type
	const price = ctx.query.price
	if(deviceId && openid && type && price){
		const result = await models.deviceInfo.findOne({deviceId: data.deviceId})
		const account = result.account
		const order = {
		account: account,
		deviceId: data.deviceId,
		openId: data.openId,
		type: data.type,
		price: data.price,
		time: new Date()
	}
	try{
		models.orderInfo.create(order)
		ctx.body = {
			success: true,
			msg: 'create order success'
		}
	}catch(e){
		ctx.body = {
			success: false,
			msg: 'create order fails'
		}
		console.error(e)
	}
	}else{
		ctx.body = {
			success: false,
			message: 'params error'
		}
	}
}

const incomeStatistics = async (ctx) => {
	const startTime = ctx.query.startTime
	const endTime = ctx.query.endTime
	const address = ctx.query.address
	const account = ctx.session.account
	try{
		const result = await models.orderInfo.find({account: account,address: address,time: {'$gte':startTime,'$lte':endTime}})
		if(!result || result.length == 0 || result == ''){
			ctx.body = {
				success: true,
				data: {}
			}
		}else{
			const ads = _.filter(result,{type: 'ads'})
			const adstotal = _.sum(ads,function(object){
				return object.price
			})
			ctx.body = {
				success: true,
				data: {
					total: adstotal,
					adsincome: adstotal
				}
			}
		}
	}catch(e){
		console.error(e)
	}
}

const test = function(ctx){
	console.log(ctx.session.account)
	ctx.body = {
		id: '1'
	}
}

module.exports = {
	createOrder,
	incomeStatistics,
	test
}