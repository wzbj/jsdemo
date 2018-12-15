/*

	功能：
		ls
			输出当前运行命令所在的目录和文件夹
		ls -p d:\
			我们还可以指定要显示的目录

	chalk样式美化命令 npm i chalk
		chalk.<style>[.<style>...](string,[string...])
		自定义颜色
		Colors:
			.hex('#f66')
			.keyword('orange')
			.rgb(15,100,204)
		Background colors
			.hex('#f66')
			.keyword('orange')
			.rgb(15,100,204)


*/

// 加载commander模块
const commander = require('commander');
const fs = require('fs');
// 美化
const chalk = require('chalk');

console.log(chalk.red('hhhhhhh'));
// 文字的修饰：斜体，加粗加重 (window下cmd支持不太好)
console.log(chalk.italic('hello world') + 'test');

// 设置当前命令的版本
commander.version('v1.0.0','-v,--version');

// 设置命令选项
commander.option('-p,--path [path]','设置要显示的目录',__dirname)

// 以列表的形式显示，如果选项不接受用户输入的值，那么这个选项将以boolean的形式提供给后面命令使用
commander.option('-l,--list','设置要显示的目录')


// 实现命令的具体逻辑
commander.action((path) => {//这里的path参数就是命令中定义的<path>
	// console.log('ls',path);
	// option中的变量会挂载到当前commander对象的同名属性下
	console.log(commander.list);
	try{
		const files = fs.readdirSync(commander.path);
		if(commander.list){
			// 如果commander.list为true，以列表的形式显示

			// 通过map生成要显示的数据
			let output = files.map(file => {

				// 文件的扩展信息(处理文件内容以外的信息)
				let stat = fs.statSync(commander.path+'/'+file);
				// console.log(stat.isDirectory());//查看是否是文件夹
				// 根据isDirectory()显示不同的文件类型
				return stat.isDirectory()? chalk.red(`[目录] ${file}\r\n`):`[文件] ${file} \r\n`;


				// return `[${type}]${file}\r\n`;
			}).join('');
			console.log(output);
		}else{
			console.log(files);

		}
	} catch(e){
		// 开发过程中可以打印出来，实际发布后错误信息可以屏蔽错误信息
		console.log(e);
	}

})

// 在把process.argv交给parse解析之前进行一个简单处理，少于3个参数，表示使用的是默认值
// if(process.argv.length < 3){
// 	process.argv.push(__dirname);
// }


// console.log(process.argv);

commander.parse(process.argv);