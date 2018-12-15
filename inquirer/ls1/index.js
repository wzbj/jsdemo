/*
	案例：ls工具
	npm init --yes
	npm i commander

	功能：
		ls
			输出当前运行命令所在的目录和文件夹
		ls d:\
			我们还可以指定要显示的目录

*/

// 加载commander模块
const commander = require('commander');
const fs = require('fs');


// 设置当前命令的版本
commander.version('v1.0.0','-v,--version');

// 
const subCommander = commander.command(' <path> ');

subCommander.option('-n,--name','设置名字')

// 实现命令的具体逻辑
commander.action((path) => {//这里的path参数就是命令中定义的<path>
	console.log('ls',path);
	// 把当前命令指定的目录下的文件及文件夹显示在控制台中

	try{
		const files = fs.readdirSync(path);
		console.log(files);
	} catch(e){
		// 开发过程中可以打印出来，实际发布后错误信息可以屏蔽错误信息
		console.log(e);
	}

})

// 在把process.argv交给parse解析之前进行一个简单处理，少于3个参数，表示使用的是默认值
if(process.argv.length < 3){
	process.argv.push(__dirname);
}


// console.log(process.argv);

commander.parse(process.argv);