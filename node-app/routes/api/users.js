// login& register
const express = require('express');
const router = express.Router();

// $router GET /api/users/test
// @desc 返回请求的json数据
// @access public
router.get("/test",(req,res) => {
  res.json({msg:"login works"})
})

module.exports = router;