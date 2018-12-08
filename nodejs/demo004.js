/*
	文件夹模块
*/

// 当我们导入的模块是文件夹的时候，就会导入文件夹模块导入机制
// 会默认导入当前文件夹的index.js文件

/*
	当我们导入的模块是一个文件夹的时候
		1.读取文件夹下的package.js文件
		2.导入package.js文件中main下指定的文件
		3.如果不存在package.json或main指定的文件，这默认自动导入模块文件夹下的index.js文件
	
*/
// let m1 = require('./m1');
// console.log(m1);


/*
	如果我们导入的模块式在node_modules目录下的，又会有另外的一种规则

	//会默认查找当前文件下的node_modules,找不到的话找父级的node_module，一直会往上找

	如果模块的加载时 ./  ../ / 开始的，那么就是路径模块加载模式
	不以./ ../ /开始的模块，按照另一种加载机制进行
		require()方法其实是module.require
		当是非路径模式的时候会按照如下规则进行模块的查找
			在module对象有一个属性，paths,是一个数组，
			里面保存的就是这种费路径加载模式需要查找的路径列表

	非路径模块加载，其实还有其他几种情况
*/

// let m2 = require('m2');
// console.log(m2);

/*
	如果自己定义的模块与核心模块冲突了，那么默认加载核心模块
*/
// let fs = require('fs');//核心模块
// console.log(fs);