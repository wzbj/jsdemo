const Sequelize = require('sequelize');

const sequelize = new Sequelize('test','root','admin',{
    host:'127.0.0.1',
    dialect:'mysql',
    dialect:'mysql',//使用的数据库，必填
    timezone:'Asia/Shanghai'
})

// 测试：如果Promise有可能抛出错误，一定要处理这个错误
try{
    sequelize.authenticate();
    console.log('连接成功');
}catch(e){
    console.log('连接失败');
}

/**
 * 数据库连接完成以后，需要确定操作的fnagfa
 * 使用orm，不需要通过sql来操作表，而是通过对象来操作
 * 给每一个要操作的表定义一个对象--模型 MOdel
 */
// 定义模型
const userModel = sequelize.define('User',{
    //描述表中对应的字段信息
    // 对象的key默认对应着表的column，字段
    id:{
        type:Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING(255),
        allowNull:false,
        defaultValue:''
    },
    age:{
        type:Sequelize.TINYINT,
        allowNull:false,
        defaultValue:0
    },
    gender:{
        type:Sequelize.ENUM('男','女'),
        allowNull:false,
        defaultValue:'男'
    }
},{
    // 用来设置字段以外的其他信息
    /**
     * 
     */
    timestamps:false,//是否给每条记录添加createdAt和updateAt字段
    paranoid:false,
    freezeTableName:true,//禁用修改表名
    tableName:'user',//手动设置表名
    indexes:[
        {
            name:'uname',
            fields:['username']
        },{
            name:'age',
            fields:['age']
        }
    ]
})

/**
 * 模型类--》表
 * 模型创建出来的对象--》表中某条记录
 */

//  let kim = new userModel();//创建了一个User的记录

let kim = userModel.build({
    // 
    username:'kim',
    age:30,
    gender:'男'
});//和上面的new是一样的

//通过new或者build出来的对象不会立即同步到数据库中，需要使用后续的一些方法来同步 
// await kim.save();

// update == set + save
// await kim.update({
//     age:32
// })
// im.destroy();

/**
 * findeOne
 *   
 */
let rs = await userModel.findOne({
    where:{
        username:'kim'
    }
})

/**
 * findeAll
 *   
 */


 lst rs = await userModel.findAll({
     where{
        //  age:{
        //      [Sequelize.Op.gte]:30//年龄大于30
        //  }

        // 多条件
        [Sequelize.Op.or]:[
            {
                age:{
                    [Sequelize.Op.gt]:30
                }
            },{
                gender:'女'
            }
        ]
     }
 })

