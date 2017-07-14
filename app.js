const Koa = require('koa')
const mongoose = require('mongoose')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')
const config = require('./config/config')
const main = require('./routes/main')
const auth = require('./routes/auth')
const index = require('./routes/index')

const app = new Koa()
const router = new Router()

require('./config/init')(app,mongoose)

app.use(static(path.resolve('views')))

app.use(bodyparser())

app.keys = [config.cookieSecret]
app.use(session(app))

router.use('/',index.routes(),index.allowedMethods())
router.use('/api',main.routes(),main.allowedMethods())
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