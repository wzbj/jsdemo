/*
	后端入口文件

	web server
		提供web浏览器服务的工具



*/

const http = require('http');

/*
	创建http服务器
*/
const app = http.createServer((req,res) => {
	/*
		req:IncomingMessage类的实例的对象，保存和提供了当前请求的客户端信息
		res:ServerResponse类的实例对象，保存和提供了响应的相关方法
	*/
	// 接收到用户的请求
	// res.write('hello');
	// console.log('有人请求了');

	// console.log(req.httpVersion);
	// console.log(req.method);
	// console.log(req.headers);
	// console.log(req.url);

	// 向客户端发送数据则需要使用到res对象
	// 头信息的设置必须早于内容的发送，否则会有问题
	res.end('hello');

	/*
		我们需要根据不同的url返回给客户端不同(对应)的数据
	*/

});



/*
	指定app监听的端口以及网络
*/
app.listen(80,() => {
	console.log('服务器启动成功');
});