const models = require('../models/models')
const _ = require('lodash')

const createOrder = (ctx) => {
	const data = {
		deviceId: ctx.query.deviceId,
		openId: ctx.query.openId,
		type: ctx.query.type,
		price: ctx.query.price
	}
	const order = {
		account: '',
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
			const ads = _.filter(result,{type: 'adsRevenue'})
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

module.exports = {
	createOrder,
	incomeStatistics
}