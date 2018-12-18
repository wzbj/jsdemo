(async function(){

    const koa = require('koa');
    const Static = require('koa-static-cache');
    const Router = require('koa-router');
    const Bodyparser = require('koa-bodyparser');
    const Mysql = require('mysql2/promise');

    const app = new koa();

    app.use(Static('./static',{
        prefix:'/static',
        gzip:true
    }));
    //如果觉得/static/index.html太丑，可以使用下面的方法
//     const content = fs.readFileSync('./static/index.html');
    // router.get('/',ctx => {
    //     ctx.body = content.toString();
    // })

    const connection =await Mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'admin',
        database:'test'
    });

    app.use(Bodyparser());

    const router = new Router();
    
    router.get('/todos',async ctx => {
        // ctx.body = [
        //     {id:1,title:'学习node',done:true},
        //     {id:2,title:'学习koa',done:true},
        //     {id:3,title:'学习mysql',done:false}
        // ]

        const [data] = await connection.query("SELECT id,title,done FROM todos");
        ctx.body = {
            code:0,
            data
        }
    });

    router.post('/add',async ctx => {
        const title = ctx.request.body.title || '';
        if(title == ''){
            ctx.body = {
                code:1,
                data:'title不能为空'
            }
            return;
        }
        // console.log(title);
        const [rs] = await connection.query("INSERT INTO todos (title,done) VALUES ('"+title+"',0)");

        if(rs.affectedRows > 0 ){//成功
            ctx.body = {
                code:0,
                data:'添加成功'
            }
        }else{
            ctx.body = {
                code:1,
                data:'添加失败'
            }
        }

    })
  
    
    app.use(router.routes());
    app.listen(3000);
    console.log('服务已启动...');

})()