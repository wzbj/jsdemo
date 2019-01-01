(async function(){
    const koa = require('koa');
    const koaStaticCache = require('koa-static-cache');
    // const koaRouter =require('koa-router');
    const koaBoayParser = require('koa-bodyparser');
    const router = require('./routers/main')

    const app = new koa();

    app.use(koaStaticCache('./public',{
        prefix:'public',
        gzip:true
    }))

    app.use(koaBoayParser())


    

    app.use(router.routes());

    app.listen(3000);
    console.log('服务器已启动...');

})()
