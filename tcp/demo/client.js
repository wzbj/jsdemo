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