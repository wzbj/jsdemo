const koa = require('koa');//http  包装过的http
const koaStaticCache = require('koa-static-cache');
const koaRouter = require('koa-router');
// 创建一个http服务器
const app = new koa();

// 主要有请求，则通过koastaticcache进行处理
// app.use(koaStaticCache(__dirname+'/static',{
// 	// root:__dirname+'/static',//如果第一个参数有，这个不用写
// 	// http://localhost/public/1.txt
// 	prefix:'/public',//如果当前请求的url是以/public开始，则作为静态资源请求

// }));

// app.use((ctx,next) => {
// 	// ...处理其他业务逻辑
// 	console.log(ctx.URL);

// })

const router = new koaRouter();

router.get('/',(ctx,next) => {
	ctx.body = '首页';
	console.log('hello');
})

// 子路由
const userRouter = new koaRouter();

userRouter.get('/',(ctx,next) => {
	ctx.body = '用户首页';
})
userRouter.get('/address',(ctx,next) => {
	ctx.body = '用户收货地址';
})

router.use('/user',userRouter.routes())

// 
const itemRouter = new koaRouter({
	prefix:'/item'
});
itemRouter.get('/add',(ctx,next) => {
	ctx.body = '添加物品';
})

// 子路由
const goodRouter = new koaRouter();
goodRouter.get('/goods/:id',(ctx,next) => {
	console.log(koaRouter.url('/list',{page:1},{query:{order:'desc'}}));///list/1?order=desc
	ctx.body = '展示物品：'+ctx.params.id;
})
// router.redirect('/admin','/user');


// 把路由挂载到app对象中
app.use(router.routes());
app.use(itemRouter.routes());
app.use(goodRouter.routes());

// 监听当前机器的地址，端口
app.listen(80);