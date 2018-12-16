
const http = require('http');

const server = http.createServer();

server.on('request', () => {
	console.log('有人访问了');
})


server.listen(3000,'0.0.0.0');
console.log('服务已启动');