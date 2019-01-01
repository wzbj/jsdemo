'use strict';

const md5 = require('md55');

module.exports = {
  up:(queryInterface,Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
        username:'kim',
        password:md5('123456')
      },
      {
        username:'bob',
        password:md5('123456')
      }
    ],{}).then(data => {
      return queryInterface.bulkInsert('Contents',[
        {
          user_id:1,
          title:'aaaa',
          content:'111111',
          comment_count:2
        },
        {
          user_id:2,
          title:'bbbbb',
          content:'2222222',
          comment_count:2
        },
        {
          user_id:1,
          title:'cccccc',
          content:'33333'
        },
        {
          user_id:2,
          title:'dddd',
          content:'44444'
        }
      ],{}).then(data => {
        return queryInterface.bulkInsert('Comments',[
          {
            content_id:1,
            user_id:1,
            content:'评论111111'
          },
          {
            content_id:1,
            user_id:2,
            content:'评论22222'
          },
          {
            content_id:2,
            user_id:1,
            content:'评论3333333'
          }
        ])
    });
  }
}
