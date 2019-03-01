// login& register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../../models/Uses");

// $router GET /api/users/test
// @desc 返回请求的json数据
// @access public
router.get("/test",(req,res) => {
  res.json({msg:"login works"})
})

// $router POST /api/users/register
// @desc 返回请求的json数据
// @access public
router.post("/register", (req,res) => {
  // console.log(req.body)

  // 查询数据库中是否拥有邮箱
  User.findOne({email:req.body.email})
      .then((user) => {
        if(user){
          return res.status(400).json({email:"邮箱已被注册"})
        }else{
          const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            // avatar,
            password:req.body.password
          })

          // 加密  安装 npm install bcrypt
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                // Store hash in your password DB.
                if(err) throw err;

                newUser.password = hash;

                newUser.save()
                       .then(user => res.json(user))
                       .catch(err => console.log(err))
            });
          });
        }
      })
})

module.exports = router;