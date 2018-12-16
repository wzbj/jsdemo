const koa = require('koa');//http  包装过的http
const koaStaticCache = require('koa-static-cache');
const Router = require('koa-router');
// koa-swig:模板引擎
const Swig = require('koa-swig');
const co = require('co');



// 创建一个http服务器
const app = new koa();

let users = [
	{username:'met'},
	{username:'look'},
	{username:'watch'},
	{username:'see'}
]

// 主要有请求，则通过koastaticcache进行处理
app.use(koaStaticCache(__dirname+'/static',{
	prefix:'/public',//如果当前请求的url是以/public开始，则作为静态资源请求

}));

const router = new Router();

const render = Swig({
	root:__dirname+'/views',
	autoescape:true,
	cache:false,//测试的时候不用缓存
	ext:'.html'
});
app.context.render = co.wrap(render);


router.get('/list',async (ctx,next) => {
	// ctx.body = '首页';
	// console.log('hello');
	console.log(users);
	ctx.body = await ctx.render('list.html',{
		users
	});
})



// 把路由挂载到app对象中
app.use(router.routes());


// 监听当前机器的地址，端口
app.listen(80);