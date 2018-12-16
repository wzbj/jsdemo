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
	host:'www.baidu.com',
	port:80,
	// http
	protocol:'http:',
	method:'get',
	path:'/img/bd_logo1.png'

},res =>{
	// let content = '';
	let content = Buffer.alloc(0);
	// 这个函数会在服务器响应的时候发出
	//   res =>  socket
	res.on('data', data => {
		// console.log(data.toString());
		// content += data.toString();
		content = Buffer.concat([content,data],content.length+data.length);
	});

	res.on('end',() => {
		fs.writeFileSync('./baidu.png',content)
	})


});

// 请求的发送
client.write('');
client.end();