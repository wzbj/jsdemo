// login& register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');//设置token,使用passwort-jwt验证token
const gravatar = require('gravatar');//头像
const keys = require("../../config/keys");
const passport = require("passport");

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
          return res.status(400).json("邮箱已被注册")
        }else{

          const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

          const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password,
            identity:req.body.identity
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

// $router POST /api/users/login
// @desc 返回token,使用jwt  passport
// @access public
router.post("/login",(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库
  User.findOne({email})
      .then(user => {
        if(!user){
          return res.status(404).json("用户不存在")
        }

        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  // jwt.sign("规则","加密名字","过期时间","箭头函数");
                  const rule = {
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar,
                    identity:user.identity
                  }
                  jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                    if(err) throw err;
                    res.json({
                      success:true,
                      token:"Bearer " + token
                    })
                  });
                  // res.json({msg:"success"})
                }else{
                  return res.status(400).json("密码错误！");
                }
              })
      })
})

// $router GET /api/users/current 验证token
// @desc 返回当前的用户信息
// @access Private
// router.get("/current","验证token",(req,res) => {
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
  // res.json({msg:success})
  // res.json(req.user)
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
  })
})

module.exports = router;