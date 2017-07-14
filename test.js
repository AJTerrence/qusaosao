const Koa = require('koa')
const app = new Koa()

const request = require('request-promise')
const Promise = require('bluebird')
const querystring = require('querystring')

const luosimaoMessage = function(ctx){
	const postData = {
		mobile:'',
        message:'尊敬的用户，您的验证码为：156235，请尽快完成验证。【脑洞科技】'
	}
	var content = querystring.stringify(postData)
	const options = {
		method:'POST',
    url:'http://sms-api.luosimao.com/v1/send.json',
    auth:'api:key-',
    agent:false,
    rejectUnauthorized : false,
    headers:{
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Length' :content.length
    },
    body: postData
}
	return new Promise(function(resolve,reject){
		request(options).then(function(response){
			console.log(response)
			const _data = response
			if(_data){
				resolve(_data)
			}else{
				throw new Error('fails')
			}
		}).catch(function(err){
			reject(err)
		})
	})
}

luosimaoMessage()

app.listen(3000)
console.log('demo listen at port 3000')

/*
var https = require('https');
var querystring = require('querystring');

var postData = {
    mobile:'',
    message:'尊敬的用户，您的验证码为：156235，请尽快完成验证。【脑洞科技】'
};

var content = querystring.stringify(postData);

var options = {
    host:'sms-api.luosimao.com',
    path:'/v1/send.json',
    method:'POST',
    auth:'api:key-',
    agent:false,
    rejectUnauthorized : false,
    headers:{
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Length' :content.length
    }
};

var req = https.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
    console.log(JSON.parse(chunk));
    });
    res.on('end',function(){
    console.log('over');
    });
});

    req.write(content);
    req.end();*/


const request = require('superagent')
const querystring = require('querystring')
const models = require('../models/models')
const Promise = require('bluebird')

module.exports = {
    sendMessage: async function(){
        const cellphone = ctx.query.cellphone
        try{
            const result = await models.userInfo.findOne({account: cellphone})
            if(result){
                ctx.body = {
                    success: false,
                    message: '获取验证码失败，该用户已注册'
                }
            }else if(!result || result.length == 0 || result == '' || result == null){
                const code Math.random().toString().substr(2,6)
                const message = `尊敬的用户，您的验证码为：${code}，请尽快完成验证。【脑洞科技】`
                const postData = {
                    agent: false,
                    rejectUnauthorized: false,
                    mobile: cellphone,
                    message: message
                }
                const url = 'https://sms-api.luosimao.com/v1/send.json'
                const key = 'key-'
                const content = querystring.stringify(postData)

                return new Promise(function(resolve,reject){
                    request.post(url)
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
                            ctx.body = {
                                success: false,
                                message: '发送验证码失败'
                            }
                            resolve(_data)
                        }
                    }).catch(function(err){
                        console.error(err)
                        reject(err)
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
    }
}
