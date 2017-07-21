const Koa = require('koa')
const mongoose = require('mongoose')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const config = require('./config/config')
const device = require('./routes/device')
const auth = require('./routes/auth')
const order = require('./routes/order')

const app = new Koa()
const router = new Router()

require('./config/init')(app,mongoose)

app.use(static(path.resolve('views')))

app.use(bodyParser())

app.keys = [config.cookieSecret]
const CONFIG = {
	key: 'koa:sess',
	maxAge: 7200000,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false
}
app.use(session(CONFIG,app))

router.use('/api',order.routes(),order.allowedMethods())
router.use('/api',device.routes(),device.allowedMethods())
router.use('/auth',auth.routes(),auth.allowedMethods())
app.use(router.routes())

app.on('error',function(err,ctx){
	if(process.env.NODE_ENV != 'production'){
		ctx.body = '500 server error'
		console.error(err.message)
		console.error(err)
	}
})

app.listen(config.PORT)
console.log(`qusaosao koa2-server is listening at port ${config.PORT}`)