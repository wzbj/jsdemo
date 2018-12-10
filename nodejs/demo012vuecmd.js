const commander = require('commander');

commander.version('1.0.0','-v,--version');//默认是-V

/*
	commander添加子命令
		.command(name,desc?,opts?)
		子命令
		name:命名的规范，也可以接受值  'create[appName]'
		desc:简介
		opts：配置

*/

let createCommander = commander.command('create <app-name>','创建项目')//node demo012vuecmd.js create
createCommander.action(() => {
	console.log('我是creat');
});

commander.action( () => {
	
})

// 解析来自process.argv上的数据
commander.parse(process.argv);