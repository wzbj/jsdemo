'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"Contents",
        key:'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"Users",
        key:'id'
      }
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
    tableName:'comments'
  });
  Comments.associate = function(models) {//多表查询
    // associations can be defined here
    // hasMany:一对多的关系，一个user对应多个content
    Comments.hasMany(models.Contents,{
      foreignKey:'content_id'
    });

    Comments.hasMany(models.Users,{
      foreignKey:'user_id'
    });
  };
  return Comments;
};