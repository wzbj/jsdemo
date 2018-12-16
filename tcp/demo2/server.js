
const http = require('http');

const server = http.createServer();
/*
	request:客户端请求对象，保存了与当前这次请求的客户端相关的信息
	response:服务端输出对象，提供了服务器输出(响应)有关的一些方法
*/
server.on('request', (request,response) => {
	console.log('有人访问了');

	//向客户端返回数据
	// request本质上是net.socket+http协议增加的一些内容
	// request.socket => net.socket
	// console.log(request.socket.remoteAddress);

	// console.log(request.url);//我们可以根据url来判断当前用户想要什么

	switch(request.url){
		
		case '/':
			response.setHeader('Content-Type','text/html');//MIME 
			response.writeHead(200,'ok');
			response.write('<h1>index<h1>');
			break;
		case '/list':
			response.writeHead(200,'ok');
			response.write('list');
			break;
		case '/view':
			response.writeHead(200,'ok');
			response.write('view');
			break;
		default:
			// response.writeHead(404,'not found',{
			// 	'Content-Type': 'text/html;charset=utf8'
			// });
			// response.write('<h1>页面不存在</h1>');

			response.writeHead(301,http.STATUS_CODES[301],{
				'Content-Type': 'text/html;charset=utf8',
				// 重定向地址
				'location':'/'
			})
	}

	response.end();


})


server.listen(3000,'0.0.0.0');
console.log('服务已启动');