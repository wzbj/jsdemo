const koa = require('koa');
const Router = require('koa-router');
const Swig = require('koa-swig');
const co = require('co');
const koaStaticCache = require('koa-static-cache')
const bodyParser = require('koa-bodyParser')

const app = new koa();
/*
	处理静态文件
*/
app.use(koaStaticCache('./static',{
	prefix:'/static',
	gzip:true
}));


/*
	处理请求中文中的数据

*/
app.use(bodyParser({

}));

const router = new Router();

/*
	存储所有的任务数据
	当前这个数据是存储在服务器运行中的内中中
*/

let datas = {
	maxId:4,
	appName:'todoList',
	skin:'index.css',
	tasks:[
		{id:1,title:'测试任务一',done:true},
		{id:2,title:'学习koa',done:false},
		{id:3,title:'学习sequelize',done:false},
		{id:4,title:'测试任务二',done:false}
	]
};
/*
	设置模板引擎
*/
app.context.render = co.wrap(Swig({
	root:__dirname+'/views',
	autoescape:true,//是否html编码，为了安全起见，一般不开启这功能，设置为true
	cache:false,
	//cache:'memory',//memory：有利于上线，只更新数据，不更新模板，把解析后的结果保存在内存中，比如每次访问都要去解析模板	

	ext:'html'

}));


/*
	首页，用于展示任务清单
*/
router.get('/',async ctx => {
	// ctx.body = '/';
	ctx.body = await ctx.render('index.html',{
		datas
	})
})


/*
	添加，添加新的任务,用来展示添加任务的页面

*/
router.get('/add',async ctx => {
	// ctx.body = '/add';
	ctx.body = await ctx.render('add.html',{
		datas
	})
})
/*
	添加，处理通过添加页面提交的数据
*/
router.post('/posttask',async ctx => {
	// querystring与当前请求的方式是没有关系的,无论是get还是post,querystring都可以传递数据
	// let title = ctx.query.title;//get请求
	// let title1 = ctx.query.title;
	let title = ctx.request.body.title || '';
	// ctx.body = '接受提交的新任务'+title1;

	if(!title){
		ctx.body = await ctx.render('message',{
			msg:'请输入任务标题',
			href:'javascript:history.back()'
		});
		return;
	}

	datas.tasks.push({
		id:++datas.maxId,
		title:ctx.request.body.title,
		done:false
	})

	ctx.body = await ctx.render('message',{
		msg:'添加成功',
		href:'/'
	})
})

/*
	改变，修改任务的状态
*/
router.get('/change/:id', ctx => {
	// ctx.body = '/change/'+ ctx.params.id;

	let id = ctx.params.id;
	datas.tasks.forEach(task => {
		if(task.id == id){
			task.done = !task.done;
		}
	});
	ctx.redirect('/');
	ctx.request.redirect('/');
})

/*
	删除
*/
router.get('/remove/:id',async ctx => {
	// ctx.body = '/remove/'+ ctx.params.id;
	let id = ctx.params.id;

	datas.tasks = datas.tasks.filter(task => task.id != id);

	ctx.body = await ctx.render('message',{
		msg:'删除成功',
		href:'/'
	})
})

app.use(router.routes());

app.listen(80);
