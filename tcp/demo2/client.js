const http = require('http');
const fs = require('fs');
/*
	http.ClientRequest类
		new http.ClientRequest
		http.request

	request消息分为三个部分
		Request Line ：请求行
		Request header:请求头
		Request body :请求正文
	每个部分又包含不同的内容

*/

// 创建一个客户端（发送http请求）
const client = http.request({
	host:'127.0.0.1',
	port:3000,
	// http
	protocol:'http:',
	method:'get',
	path:'/list'

},res =>{
	res.on('data', data => {
		console.log(data.toString());
	})
});

// 请求的发送
client.write('');
client.end();