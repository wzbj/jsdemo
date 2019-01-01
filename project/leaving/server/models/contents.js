'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define('Contents', {
    id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:Sequelize.INTEGER
    },
    user_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"Users",
        key:'id'
      }
      
    },
    title:{
      type:Sequelize.STRING(50),
      allowNull:false
    },
    content:{
      type:Sequelize.STRING(1000),
      allowNull:false
    },
    like_count:{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    comment_count:{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    tableName:'contents'
  });
  Contents.associate = function(models) {//多表查询
    // associations can be defined here
    // hasMany:一对多的关系，一个user对应多个content
    Contents.belongsTo(models.Users,{
      foreignKey:'user_id'
    });
    Contents.hasMany(models.Comments,{
      foreignKey:'content_id'
    });
  };
  return Contents;
};