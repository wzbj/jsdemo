const koa = require('koa');//http  包装过的http

// 创建一个http服务器
const app = new koa();

// 热重载  supervisor
/*
	npm i -g supervisor
	npm i supervisor
*/

// 注册中间件  webpack ->读取文件，loader，plugin，打包并生成文件
// app.use( (cxt,next) => {
// 	// cxt  koa处理过的对象
// 	cxt.body = '<strong>hello koa';
// 	next();
// })

// app.use(async (cxt,next) => {
// 	cxt.body += 'hello koa</strong>';

// 	// await db.findOne();
// })

app.use((ctx,next) => {
	// throw new Error();

	let n = Math.random();
	// ctx.n = n;//不推荐这样用
	// ctx.state.n = n;

	// ctx.throw(404,'页面没了',{a:1});

	ctx.response.body = {a:1,b:2};

	// ctx.attachment('a.txt');//设置下载头

	next();

})

app.use( (ctx,next) => {
	console.log(ctx.state.n);
})

app.on('error', (err,ctx) => {
	console.log(err);
	console.log(err.message);
	console.log(err.a);
	ctx.redirect();//重定向
})

// 监听当前机器的地址，端口
app.listen(80);