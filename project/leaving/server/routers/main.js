const koaRouter =require('koa-router');
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize()

const Models = require('../models');

const router = new koaRouter();

router.get('/',async ctx => {
    // 操作数据库
    let data = await Models.Users.findAll();

    ctx.body = '....';
})


module.exports = router;