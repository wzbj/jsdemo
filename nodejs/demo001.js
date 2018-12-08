/*
	REPL-命令
	.break 退出
	.clear
	.exit
	.help
	.save
	set  查看环境变量
	console.table([{a:1,b:'Y'},{a:2,b:3}])
	1.全局对象-global
		类似浏览器全局对象window，但是node(ECMAScirpt)环境中没有window(本质上，浏览器的window其实
		就是扩展自ECMAScript中的global)
	2.__dirname  返回当前文件所在的目录 用来定位引入文件
	3.__filename  这个文件及文件所在文件目录
	4.EventLoop  事件循环
		check 只处理setImmediate的函数
		Close callback  专门处理一些close类型的回调，如关闭网络连接等

		Pending I/O Callback  执行IO回调，文件操作，网络操作等
		Idle，Prepare   内部使用
		Poll 轮训I/O操作，是否有I/O callback，如果没有这会阻塞(有超时和基本检测)一段时间

		宏任务
			主体script,setTimeout,setInterval
		微任务
			Promise.then，process.nextTick
	5.执行流程，限制性宏任务，在执行微任务，最后进到eventLoop


*/


// console.log(__dirname);
// console.log(__filename);

// console.log(1);
// setTimeout(function(){
// 	console.log('定时任务1');
// },100);
// setTimeout(function(){
// 	console.log('定时任务2');
// },101);
// setTimeout(function(){
// 	console.log('定时任务3');
// },100);

// console.log(2);


// setTimeout( () => {
// 	new Promise(resolve => {
// 		resolve();
// 	}).then(()=>{
// 		console.log('Promise');
// 	});
// 	console.log(22);

// 	setTimeout(()=>{
// 		console.log(11);
// 	},1000)

// },1000)
/*
22
Promise
11

*/

global.m2 =112;

var a = 66;
exports.a =a;


