/*
	FileSystem
		fs模块体用了一些与文件系统交互的API
		require('fs')
		数据的基本操作：CURD
*/
const fs = require('fs');

// write
	// 写入数据到文件
// fs.writeFile(file, data[, options], callback)
// output 向程序外输出数据  input/output  =>  i/o操作  =>流 二进制 => buffer  => steam
// 数据(字符串，音频，视频，二进制) =>buffer => stream
// 如果文件不存在，则创建
// 如果目录不存在，则文件创建就会失败
// First Error ：node中一种约定，如果一个回调可能有错误发生，那么约定回调函数的第一个参数专门用来提供错误对象
// fs.writeFile('./1.txt','hello1',(err) => {
// 	if(err){
// 		console.log('写入失败');
// 	}else{
// 		console.log('文件写入成功');
// 	}
// })

// 同步模式
// fs.writeFileSync('./1.text','hello1');
// try{
// 	fs.writeFileSync('./1.text','hello1');
// }catch(e){
// 	console.log(e);
// }

// 追加内容
// fs.appendFileSync('./1.txt','我是追加的')


// let content = fs.readFileSync('./1.txt');
// console.log(content.toString());


// 查看信息
// let info = fs.statSync('./1.txt');
// console.log(info);
// console.log(info.isFile());//查看是否是文件


// 删除文件  unlinkSync
// fs.unlinkSync('./1.txt');



// 文件夹操作，不会进行递归创建
// fs.mkdirSync('./a');//创建文件夹


// fs.rmdirSync('./a');//删除文件夹,但是不能删除非空文件夹

// 删除有内容的文件夹，先删除数据，再删除文件夹
// let dirPath = './test';
// let files = fs.readdirSync(dirPath);
// console.log(files);
// files.forEach( child => {
// 	// console.log(child);
// 	// 删除每一个子文件
// 	fs.unlinkSync(dirPath+'/'+child);
// })
// fs.rmdirSync(dirPath);



//删除目录的递归方法 
function rmdir(dirPath){
	let files = fs.readdirSync(dirPath);
	console.log(files);
	files.forEach( child => {
		let childPath = dirPath + '/' + child;
		// 当前child可能是文件也可能是文件夹
		if(fs.statSync(childPath).isDirectory()){//判断是否是文件夹
			// 文件夹，因为文件夹内还有子目录，所以也不能直接删除，而是需要递归调用rmdir方法
			rmdir(dirPath);
		}else{
			// 删除每一个子文件
			fs.unlinkSync(childPath);

		}
	})
	fs.rmdirSync(dirPath);

}


// watchFile  当文件发生改变的时候，出发回调
fs.watchFile('./1.txt',(e) => {
	// e:类似于事件对象，保存当前变化的细节
	console.log(e);
})

// watch  可以监听文件或者目录
fs.watchFile('./test',(eventType,filename) => {
	// enentType: change rename
	// filename  当前发生改变的具体文件
	console.log(eventType,filename);
})


/*

const fsPromises = require('fs').promises;
// v10.0.0以后
fsPromises.mkdir('./b').then(() => {
	console.log();
}).catch(err => {});

*/