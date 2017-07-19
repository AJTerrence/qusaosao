/*const request = require('superagent')
const querystring = require('querystring')
const _code = require('./code')
const Promise = require('bluebird')

const message = `尊敬的用户，您的验证码为：${_code.CODE}，请尽快完成验证。【脑洞科技】`

module.exports = {
    sendMessage: async function(cellphone,ctx){
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
            request.post(url)
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Content-Length',content.length)
            .auth('api',key)
            .send(content)
            .then(function(response){
                console.log(response.body)
                const _data = response.body
                console.log(_data.error)
                ctx.body = _data
                if(_data.error == '0'){
                    console.log('success')
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
                    resoleve(_data)
                    throw new Error('send message fails')
                }
            }).catch(function(err){
                reject(err)
            })
        })
        ctx.body = await new Promise(function(resolve,reject){
            request.post(url)
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Content-Length',content.length)
            .auth('api',key)
            .send(content)
            .then(function(response){
                const _data = response.body
                console.log(_data)
                if(_data){
                    return _data
                    resolve(_data)
                }else{
                    throw new Error('fails')
                }
            }).catch(function(err){
                reject(err)
            })
        })
    }
}*/