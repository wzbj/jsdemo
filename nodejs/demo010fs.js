var fs = require('fs');

/*
	fs.open(path,flags,[mode],callback)
	path：要打开的文件路径
	flags:打开文件的方式读/写
	mode:设置文件的模式(权限，读写执行)
	err:文件打开失败的错误保存在err里面，如果成功err为null
	fd:被打开文件的标识，和定时器 
*/

// fs.open('1.txt','r',(err,fd) => {
// 	console.log(err);
// 	console.log(fd);
// 	if(err){
// 		console.log('文件打开失败');
// 	}else{
// 		console.log('文件打开成功')
// 	}
// })

// fs.open('1.txt','r',(err,fd) => {
// 	console.log(fd);	
// })

// var fd = fs.openSync('1.txt','r');
// console.log(fd);





fs.open('1.txt','r',(err,fd) => {
	console.log(err);
	console.log(fd);
	if(err){
		console.log('文件打开失败');
	}else{
		// console.log('文件打开成功')
		/*
			fs.read(fd,buffer,offset,length,position,callback)
				fd:通过open方法成功打开一个文件返回的编号
				buffer:buffer对象
				offset：偏移量,新的内容添加到buffer中国的起始位置
				length：长度  添加到buffer中的内容长度
				postion:位置 
				callback:回调
					err
					buffer的长度
					buffer对象

		*/
		var bf1 = new Buffer(10);
		console.log(bf1);	
		fs.read(fd,bf1,0,4,null,(err,len,newBf) => {
			console.log(bf1.toString());
			console.log(len);
			console.log(newBf);
		})
	}
})

