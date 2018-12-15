
var fs = require('fs');

var filedir = './wztest/source';

fs.watch(filedir,function(ev,file){
	// console.log(ev+'/'+file);//这里不需要判断file是否有内容

	// 只要一个文件发生了变化，我们就需要对这个文件下的所有文件进行读取，然后合并
	fs.readdir(filedir,function(dataList){
		var arr = [];

		dataList.forEach(function(f){
			var info = f.statSync(filedir +'/'+f);
			console.log(info);
		})
	})
})