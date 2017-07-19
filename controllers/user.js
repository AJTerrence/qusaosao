const models = require('../models/models')
const crypto = require('crypto')
//const message = require('./message')
const _code = require('./code')
const Request = require('superagent')
const querystring = require('querystring')
const Promise = require('bluebird')

const secret = 'nowdone'
const message = `尊敬的用户，您的验证码为：${_code.CODE}，请尽快完成验证。【脑洞科技】`

const login = async function(ctx){
	const cellphone = ctx.request.body.cellphone
	const password = ctx.request.body.password
	try{
		const result = await models.userInfo.find({account: cellphone})
		const data = result[0]
		if(!result || result == '' || result.length == 0 || result == null){
			ctx.body = {
				success: false,
				message: '用户不存在'
			}
		}else if(data.account == cellphone){
			const pwd = crypto.createHmac('sha1',data.salt).update(password + secret).digest().toString('base64')
			if(data.password == pwd){
				ctx.session.cellphone = cellphone
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
/*
const getVerifyCode = async function(ctx){
	const cellphone = ctx.query.cellphone
	try{
		const result = await models.userInfo.findOne({account: cellphone})
		if(!result || result == '' || result.length == 0 || result == 'null'){
			message.sendMessage(cellphone,ctx)
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
*/
const getVerifyCode = async function(ctx){
	const cellphone = ctx.query.cellphone
	if(cellphone){
        try{
            const result = await models.userInfo.findOne({cellphone: cellphone})
            if(result){
                ctx.body = {
                    success: false,
                    message: '获取验证码失败，该用户已注册'
                }
            }else if(!result || result.length == 0 || result == '' || result == null){
                const postData = {
                    agent: false,
                    rejectUnauthorized: false,
                    mobile: cellphone,
                    message: message
                }
                const url = 'https://sms-api.luosimao.com/v1/send.json'
                const key = 'key-edc07f15d2fee2b10f4f2f05296f8234'
                const content = querystring.stringify(postData)

                return new Promise(function(resolve,reject){
                    Request.post(url)
                    .set('Content-Type','application/x-www-form-urlencoded')
                    .set('Content-Length',content.length)
                    .auth('api',key)
                    .send(content)
                    .then(function(response){
                        console.log(response.body)
                        const _data = response.body
                        if(_data.error == '0'){
                            ctx.body = {
                                success: true,
                                message: '发送验证码成功'
                            }
                            resolve(_data)
                        }else{
                        	console.error(_data)
                            ctx.body = {
                                success: false,
                                message: '发送验证码失败'
                            }
                            reject(_data)
                        }
                    }).catch(function(err){
                        console.error(err)
                    })
                })
            }
        }catch(e){
            console.error(e)
            ctx.body = {
                success: false,
                message: '发生错误:' + e.message
            }
        }
    }else{
    	console.log('error')
    }
}

const register = function(ctx){
	const cellphone = ctx.request.body.cellphone
	const password = ctx.request.body.password
	const code = ctx.request.body.code
	const name = ctx.request.body.name
	if(cellphone && password && code && name){
	if(_code.CODE == code){
		const salt = cellphone + new Date().getTime() + secret
		const pwd = crypto.createHmac('sha1',salt).update(password + secret).digest().toString('base64')
		const user = {
			cellphone: cellphone,
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
			ctx.session.cellphone = cellphone
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
}else{
	console.log('error')
}
}

module.exports = {
	register,
	login,
	getVerifyCode
}