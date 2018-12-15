/*
	服务器
		监听当前服务器上指定的ip与端口，如果有数据发送到该ip和端口上，就进行处理

	dgram（UDP）事件
		close
		error
		listening
		message
*/

const dgram = require('dgram');

/*
	创建一个scoket类，scoket就是用来处理网络数据的一个标准API
	通过socket，我们就可以通过网络数据进行读取和输出

	dgram.Scoket类
*/
// const socket = new dgram.Socket();
const serverSocket = dgram.createSocket('udp4');//udp4 =》ipv4或者udp6=》ipv6

serverSocket.on('listening',() => {
	console.log('服务器开启成功,等待数据：');
})

serverSocket.on('message',data => {
	console.log('接收到了数据：'+data.toString());
})

/*
	监听指定的地址及端口
*/
serverSocket.bind(12345,'127.0.0.1')



