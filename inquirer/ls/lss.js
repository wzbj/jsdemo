const commander = require('commander');

const subCommand = commander.command('create <a> <b> <c>');

// 在action的回调函数的参数列表中就是command定义的参数
subCommand.action((a,b,c) => {
	console.log(a,b,c);
})

commander.parse(process.argv);
