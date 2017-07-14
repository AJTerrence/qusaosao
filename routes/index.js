const router = require('koa-router')()

router.get('/',async function(){
	if(ctx.session.account){
		await next()
	}else{
		ctx.redirect('/login.html')
	}
})

module.exports = router