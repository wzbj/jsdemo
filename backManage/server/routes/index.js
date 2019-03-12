var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/checklogin', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/checklogin', (req,res) => {
	console.log(req.body)
	// let {username, password } = req.body;
	var response = {status:200,data:[{
		'username':req.body.username,
		'password':req.body.password
	}]};
	console.log(response)
	res.send(JSON.stringify(response));
});

module.exports = router;
