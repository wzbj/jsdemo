/*
	node demo app创建个app目录
	demo:我们的脚本文件
	app ：要生成的项目名称
	-i : 参数，表示要同事生产index.html文件
*/

const fs = require('fs');

// 获取用户要生成的项目名称.process
// console.log(process.argv);
let appName = process.argv[2];

// 根据项目名称生成指定的目录
// __dirname  当前目录
let appRoot = __dirname + '/' + appName;
if(fs.existsSync(appRoot)){
	console.log('项目已经存在');
	process.exit();
}else{
	console.log('项目创建成功');
}
fs.mkdirSync(appRoot);
fs.mkdirSync(appRoot + '/images');
fs.mkdirSync(appRoot + '/css');
fs.mkdirSync(appRoot + '/js');

// console.log(appPath);

// 判断是否存在-i的选项
if(process.argv.includes('-i')){
	fs.writeFileSync(appRoot + '/index.html',`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
		`);
}
console.log('项目创建完成');

process.stdout.cursorTo(0,0);//移动光标
process.stdout.write('(+)aaa \r\n');
process.stdout.write('()bbb \r\n');
process.stdout.write('()ccc \r\n');