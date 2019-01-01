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

        /** 
         * ORDER BY 排序
         * DESC 从大到小降序 asc 从小到大(默认)
         * 
         * [LIMIT N] N:数字，要限查询数据的最大条数
         * LIMIT 查询数据限制
         * OFFSET 查询偏移量
         * 每页显示3条 1页：0-->2 2页:3-->5
         * 每页显示  ->  LIMIT
         * 当前的页码 -->OFFSET
         * OFFSET必须与LIMIT一起使用，且LIMIT在前
         * 总页码：
         * 
        */

        // 数据排序
        //const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY done DESC,id DESC");
        // 分页
        let page = ctx.query.page || 1;//有前端来决定
        page = Number(page);
        const prepage = 4;
        // const sql = `SELECT id,title,done FROM todos`;
        // const [todosAll] = await connection.query(sql);
        // const pages = Math.ceil(todosAll.length / prepage);
        
        // const sql2 = `SELECT id,title,done FROM todos LIMIT ${prepage} OFFSET ${(page-1)*prepage}`;
        
        /**
         * 查询语句
         * 
         */
        let type = ctx.query.type;
        let where = '';
        if(type){
            where = `WHERE done= `+ Number(type);
        }
        const sql = `SELECT id,title,done FROM todos ${where}`;
        const [todosAll] = await connection.query(sql);
        const pages = Math.ceil(todosAll.length / prepage);

        // 占位  where ??=? --> ??表示字段或表名，?表示值
        // const sql2 = `SELECT id,title,done FROM todos ${where} LIMIT ${prepage} OFFSET ${(page-1)*prepage}`;
        const sql2 = `SELECT id,title,done FROM todos ${where} LIMIT ? OFFSET ?`;
        
        const [data] = await connection.query(sql2,[prepage,(page-1)*prepage]);
        ctx.body = {
            code:0,
            data:{
                page,
                prepage,
                todos:data,
                pages:pages
            }
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

    router.post('/remove',async ctx => {
        const id = ctx.request.body.id || 0;
        console.log(id);
        if(!id){//没有接收到id
            ctx.body = {
                code:1,
                data:'删除失败'
            }
        }
        let del = await connection.query("DELETE FROM todos WHERE id = "+id+" ");
        if(del){
            // 删除成功逻辑
            ctx.body = {
                code:0,
                data:'删除成功'
            }
        }else{
            ctx.body = {
                code:1,
                data:'删除失败'
            }
        }
    })

    router.post('/toggle',async ctx => {
        let id = Number(ctx.request.body.id) || 0;
        let done = Number(ctx.request.body.done) || 0;
        // update 更新数据库
        let sql = "UPDATE todos SET ??=? WHERE ??=?";

        let [rs] = await connection.query(sql,['done',done,'id',id]);
        if(rs.affectedRows > 0){
            ctx.body = {
                code:0,
                data:'修改成功'
            }
        }else{
             ctx.body = {
                 code:2,
                 data:'修改失败'
             }
        }

    })

    /**
     * DISTINCT 去重
     * select DISTINCT done FROM todos;
     * 
     * like 模糊搜索，通常与%配合使用
     * %test 以test结尾
     * test% 以test开始
     * %test% 包含test
     * SELECT name FROM tablename WHERE name LIKE %test%
     * NOT LIKE：与LIKE相反
     * 
     * IN  多值匹配
     * UPDATE todos SET done=1 where id IN (1,8)
     * 
     * UCASE() 转成大写
     */
  
    
    app.use(router.routes());
    app.listen(3000);
    console.log('服务已启动...');

})()

