var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/checklogin', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/checklogin', (req,res) => {
	res.send(1);
});

module.exports = router;
