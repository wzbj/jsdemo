/*
	var http = require('http');
	var server = http.createServer();
	server.listen(port,[hostname],[backlog],[callback])
	-监听客户端连续请求，只有当调用了listen方法以后，服务端才开启工作
	-port:监听的端口
	-hostname：主机名，(IP/域名)
	-backlog:连续等待队列的最大长度
	-callback：调用listen方法成功开启监听以后，会触发一个listening事件，callback将作为该事件的执行函数

	req.url

*/
var http = require('http');
var server = http.createServer();
var url = require('url');

server.on('error',function(err){
	console.log(err);
})

server.on('listening',function(){
	console.log('listening');
})
/*
	text/html  :html文段
	text/plain  :纯文本

*/
server.on('request',function(req,res){
	// console.log(req.headers);
	res.setHeader('wz','test');
	res.writeHead(200,'sss',{
		// 'content-type':'text/plain'
		'content-type':'text/html;charset=utf-8'
	});

	var urlstr = url.parse(req.url);
	console.log(urlstr);



	res.write('hello');
	// res.end('hello');//可以把内容写在end里面，不用写write
	res.end();
	console.log('有客户端请求');
})

server.listen(8080,'localhost');

// console.log(server.address());