// console.log(process);
var fs = require('fs');
/*
process
	argv :用来获取当前运行node程序的相关参数

*/

// console.log(process.argv);

// if(process.argv.includes('-v')){
// 	console.log('v1.0.0');//node demo006process.js -v

// }

// console.log(process.env);//环境变量

// if(process.env.mode || process.env.mode == 'dev'){
// 	console.log('现在是开发模式，会打印错误及警告信息');
// }else{
// 	console.log('生产模式');
// }


// let url = {
// 	'dev':{

// 	},
// 	'test':{

// 	},
// 	'pro':{

// 	}
// }
// url[process.env.mode]//根据环境变量不同设置不同的url

// let i = 0;
// setInterval( () => {
// 	i++;
// 	console.log(i);
// 	if(i>10){
// 		process.exit();//控制进程信息，退出进程
// 	}
// })

/*
	process.stdout
		标准输出流
		.write(data[,encoding][,callback])
	process.stdin
		标准输入流
		事件
			'data'
*/

// process.stdout.write('hello');

// process.stdin.on('data',(e) => {
// 	console.log('用户输入'+e.toString());
// 	// console.log(e);
// })

process.stdout.write('请输入你要创建的项目名称');
process.stdin.on('data', (e) => {
	console.log('项目名称：'+ e.toString());
	fs.mkdirSync(e.toString());
	process.stdout.write('项目创建成功');
})


