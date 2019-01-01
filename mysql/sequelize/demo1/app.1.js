const Sequelize = require('sequelize');
/**
 * sequelize是一个基于promise的nodejs ORM，目前支持postgres，mssql,SQLite和Microsoft SQL SERVER,它具有强大的事务支持，关联联系，读取和复制等功能
 * 
 * ORM
 *  对象关系映射：Object Relational mapping
 *  通过对象来映射和操作数据库
 *  把js中的对象与数据库进行关联(映射，后期通过操作对象来操作数据库)
 * 
 * 模型
 *  用来表述(描述)数据库表字段信息的对象，每一个模型对象表示数据库中的一个表，后续对数据库的操作是通过对应的模型对象完成的
 * 
 * sequelize 以来mysql2，需要手动安装
 * 
 */

//  表，账号，密码，对象
const sequelize = new Sequelize('test','root','admin',{
    // 其他的数据库连接配置
    host:'127.0.0.1',
    prot:3306,//默认
    dialect:'mysql',//使用的数据库，必填
    //timezone:'+08:00'   //时区 当我们向数据库写入时间的时候，默认会根据系统当前所在的时区进行设置，格式：+08:000
    timezone:'Asia/Shanghai'
})

sequelize.authenticate().then(() => {
    console.log('连接成功');
}).catch(err => {
    console.log('连接失败');
})

// 定义模型
const User = sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    age:{
        type:Sequelize.TINYINT,
        allowNull:false
    },
    gender:{
        type:Sequelize.ENUM('男','女'),
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'user'
})

// User.findAll().then( users => {
//     // console.log(rs);
//     users.forEach(user => {
//         console.log(user.get('username'));
//     })
// })

// let zhangsan = User.build({
//     username:'张三',
//     age:20,
//     gender:'男'
// });

// zhangsan.set('age',25);

// zhangsan.save();

User.findById(5).then(user => {
    // console.log(user);
    user.set('username','李四');
    user.save();
})
