/*
	tcp：基于node，在tcp协议，基于net模块来实现的

*/

const net = require('net');

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
server.on('connection',() => {
	console.log('有人连接');
})


/*
	监听地址及断口
*/

server.listen(12345,'127.0.0.1');
console.log(1111111);