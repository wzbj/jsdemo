'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull:false
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
    tableName:'likes'
  });
  Likes.associate = function(models) {//多表查询
    // associations can be defined here
    // hasMany:一对多的关系，一个user对应多个content
    Likes.hasMany(models.Contents,{
      foreignKey:'user_id',
      as:'contents'
    })
  };
  return Likes;
};