const models = require('../models/models')
const crypto = require('crypto')
//const message = require('./message')
const _code = require('./code')
const request = require('superagent')
const querystring = require('querystring')
const Promise = require('bluebird')

const secret = 'nowdone'
const message = `尊敬的用户，您的验证码为：${_code.CODE}，请尽快完成验证。【脑洞科技】`

const login = async function(){
	const account = ctx.request.body.account
	const password = ctx.request.body.password
	try{
		const result = await models.userInfo.findOne({account: account})
		if(!result || result == '' || result.length == 0 || request == 'null'){
			ctx.body = {
				success: false,
				message: '用户不存在'
			}
		}else if(result.account == account){
			const pwd = crypto.createHmac('sha1',result.salt).update(password + secret).digest().toString('base64')
			if(result.password == pwd){
				ctx.session.account = account
				ctx.body = {
					success: true,
					message: '登录成功'
				}
			}else{
				ctx.body = {
					success: false,
					message: '密码不正确'
				}
			}
		}
	}catch(e){
		console.error(e)
		ctx.body = {
			success: false,
			message: 'error:' + e.message
		}
	}
}

const getVerifyCode = async function(ctx){
	const cellphone = ctx.query.cellphone
	try{
		const result = await models.userInfo.findOne({account: cellphone})
		if(!result || result == '' || result.length == 0 || result == 'null'){
			//message.sendMessage(cellphone,ctx)
			const postData = {
            agent: false,
            rejectUnauthorized: false,
            mobile: cellphone,
            message: message
        }
        const url = 'https://sms-api.luosimao.com/v1/send.json'
        const key = 'key-'
        const content = querystring.stringify(postData)
        ctx.body = {
        	success: true,
        	message: 'send message success'
        }
        return new Promise(function(resolve,reject){
            request.post(url)
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Content-Length',content.length)
            .auth('api',key)
            .send(content)
            .then(function(response){
                console.log(response.body)
                const _data = response.body
                console.log(_data.error)
                if(_data){
                    resolve(_data)
                }else{
                    throw new Error('send message fails')
                    resolve(_data)
                }
            }).catch(function(err){
                reject(err)
            })
        })
		}else{
			ctx.body = {
				success: false,
				message: '获取验证码失败，该用户已注册'
			}
		}
	}catch(e){
		console.error(e)
		ctx.body = {
			success: false,
			message: e.message
		}
	}
}

const register = function(ctx){
	//const cellphone = ctx.request.body.cellphone
	//const password = ctx.request.body.password
	//const code = ctx.request.body.code
	//const name = ctx.request.body.name
	const account = ctx.query.cellphone
	const password = ctx.query.password
	const code = ctx.query.code
	const name = ctx.query.name
	if(_code.CODE == code){
		const salt = account + new Date().getTime() + secret
		const pwd = crypto.createHmac('sha1',salt).update(password + secret).digest().toString('base64')
		const user = {
			account: account,
			password: pwd,
			salt: salt,
			email: '',
			name: name,
			openId: '',
			address: '',
			subUser: [{
				subAccount: '',
				subPassword: '',
				subEmail: '',
				subName: ''
			}],
			bankcard: [{
				bankcardName: '',
				bankcardNumber: ''
			}],
			deviceGroup: [],
			time: new Date()
		}
		try{
			models.userInfo.create(user)
			ctx.session.account = account
			ctx.body = {
				success: true,
				message: '注册成功'
			}
		}catch(e){
			console.error(e)
			ctx.body = {
				success: false,
				message: 'error:' + e.message
			}
		}
	}else{
		ctx.body = {
			success: false,
			message: '验证码错误'
		}
	}
}

module.exports = {
	register,
	login,
	getVerifyCode
}
