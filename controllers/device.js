const models = require('../models/models')
const user = require('./user')
const _ = require('lodash')

const getEachDeviceDetails = async function(ctx){
	const deviceId = ctx.query.deviceId
	try{
		const result = await models.deviceInfo.findOne({deviceId: deviceId})
		if(result){
			console.log(result)
			ctx.body = {
				success: true,
				message: '获取设备详情成功',
				data: result
			}
		}else{
			ctx.body = {
				success: false,
				message: '获取设备详情失败',
				data: {}
			}
		}
	}catch(e){
		console.error(e.message)
	}
}

const deviceRegister = async function(ctx){
	const deviceId = ctx.query.deviceId
	try{
		const result = await models.deviceInfo.findOne({deviceId: deviceId})
		if(result){
			ctx.body = {
				success: false,
				message: '该设备已注册'
			}
		}else{
			const device = {
				account: ctx.session.account,
				deviceType: '娃娃机',
				deviceId: deviceId,
				deviceNumber: '',
				deviceActive: '离线',
				store: '',
				address: '',
				price: '1',
				remarks: '',
				presentType: '' || '纸巾',
				stock: '' || '0',
				time: new Date()
			}
			models.deviceInfo.create(device)
			ctx.body = {
				success: true,
				message: '设备注册成功'
			}
		}
	}catch(e){
		console.error(e.message)
	}
}

const deviceManagement_all = async function(ctx){
	const account = ctx.session.account
	try{
		const result = await models.deviceInfo.find({account: account})
		if(result == '' || result.length == '0' || !result){
			ctx.body = {
				success: true,
				data: {}
			}
		}else{
			ctx.body = {
				success: true,
				data: result
			}
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_offline = async function(){
	const account = ctx.session.account
	try{
		const result = await models.deviceInfo.find({account: account,deviceActive: '离线'})
		if(result == '' || result.length == '0' || !result){
			ctx.body = {
				success: true,
				data: {}
			}
		}else{
			ctx.body = {
				success: true,
				data: result
			}
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_online = async function(){
	const account = ctx.session.account
	try{
		const result = await models.deviceInfo.find({account: account,deviceActive: '在线'})
		if(result == '' || result.length == '0' || !result){
			ctx.body = {
				success: true,
				data: {}
			}
		}else{
			ctx.body = {
				success: true,
				data: result
			}
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_address = async function(){
	const account = ctx.session.account
	const address = ctx.query.address
	try{
		const result = await models.deviceInfo.find({account: account,address: address})
		if(!result || result.length == '0' || result == ''){
			ctx.body = {
				success: true,
				data: {}
			}
		}else{
			ctx.body = {
				success: true,
				data: result
			}
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_number = async function(){
	const account = ctx.session.account
	try{
		const result = await models.deviceInfo.find({account: account})
		if(!result || result.length == '0' || result == ''){
			ctx.body = {
				success: true,
				data: []
			}
		}else{
			const _data = _.map(result,'deviceId')
			ctx.body = {
				success: true,
				data: _data
			}
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_updateNum = async function(){
	const deviceId = ctx.query.deviceId
	const deviceNumber = ctx.query.deviceNumber
	try{
		const result = await models.deviceInfo.update({deviceId: deviceId},{$set:{deviceNumber: deviceNumber}})
		ctx.body = {
			success: true,
			message: 'success'
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_setprice = async function(){
	const deviceId = ctx.query.deviceId
	const newprice = ctx.query.price
	try{
		const result = await models.deviceInfo.update({deviceId: deviceId},{$set:{price: newprice}})
		ctx.body = {
			success: true,
			message: 'update price success'
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_updatestock = async function(){
	const newstock = ctx.query.stock
	const deviceId = ctx.query.deviceId
	try{
		const result = await models.deviceInfo.update({deviceId: deviceId},{$set: {stock: newstock}})
		ctx.body = {
			success: true,
			message: 'update stock success'
		}
	}catch(e){
		console.error(e)
	}
}

const deviceManagement_updateremarks = async (ctx) => {
	const deviceId = ctx.request.body.deviceId
	const newremarks = ctx.request.body.remarks
	try{
		await models.deviceInfo.update({deviceId: deviceId},{$set: {remarks: newremarks}})
		ctx.body = {
			success: true,
			message: 'update remarks succeed'
		}
	}catch(e){
		console.error(e)
	}
}

module.exports = {
	getEachDeviceDetails,
	deviceRegister,
	deviceManagement_all,
	deviceManagement_offline,
	deviceManagement_online,
	deviceManagement_address,
	deviceManagement_number,
	deviceManagement_updateNum,
	deviceManagement_setprice,
	deviceManagement_updatestock,
	deviceManagement_updateremarks
}