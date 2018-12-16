/*
	tcp：基于node，在tcp协议，基于net模块来实现的

*/

const net = require('net');
const fs = require('fs');

/*
	创建一个服务器
		1.处理地址及端口
		2.处理发送到当前监听地址及端口的数据
		3.返回(发送)数据到连接的客户端
	net.Server 类
		new net.Server()
		net.createSever() => retrun new net.Server()

*/

const server = net.createServer( () => {
	// 这个函数其实就是connection事件绑定的函数
});

/*
	function createServer(callback){
		let s = new net.Server();
		s.on('connection',callback);
		return s;
	}


*/


//当有客户端连接的时候触发
server.on('connection',socket => {
	// socket =>当前连接的socket对象
	console.log('有人连接');
	socket.write('hello');

	socket.on('data', data => {
		// socket.write('show me the moeny');
		// console.log(data,socket.remoteAddress,socket.remotePort);
		// 发送一个照片给客户端
		let datas = fs.readFileSync('./1.jpg');
		console.log(datas);
		socket.write(datas);
	})


})


/*
	监听地址及断口
*/

server.listen(12345,'127.0.0.1');
console.log(1111111);