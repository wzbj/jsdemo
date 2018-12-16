const net = require('net');

/*
	创建客户端与udp不同
	net.socket类
	1.new new.Socket()
	2.net.createConnection()
	
*/

// 要连接的目标主机的地址及端口号
// 0.0.0.0  通配
const clientSocket = net.createConnection(12345,'127.0.0.1');

// 监听数据传输
clientSocket.on('data', data => {
	// console.log('数据库返回：'+data);
	// clientSocket.write('moeny');

	console.log('数据：',data);//数据太大的时候会分包

	// 拼装buffer数据
})

// 当数据包接受完成时触发
clientSocket.on('end', () => {
	console.log('数据接受完成');
	// 把接收的数据组合起来，然后通过fs写入到client文件中
	// 注意：接受到的数据是buffer

})

