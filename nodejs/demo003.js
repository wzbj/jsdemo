/*
	每一个模块中都会有一个内置的对象：module
		该对象提提供了包含当前模块文件所拥有的一些信息
		module对象
			id ：当前模块的唯一表示，默认id为当前这个文件的绝对路径
			filename:当前模块的文件名
			parent
			children
			loaded ：当前模块是否已经加载完成
			paths


*/

/*
	exports:
		每一个模块文件中有一个exports对象
		在模块对象module下有一个属性exports

	虽然exports == module.exports是同一个东西，但是使用上是有一定的注意事项
	
*/

exports.a =1;//等同于 module.exports.a = 1;
console.log(module);
console.log(exports == module.exports);//true

// 导出多个数据
exports.b =10;

// 我们也可以写
// module.exports.a =1;
// module.exports.b = 10;

// exports = {//导不出去  相当于把exports与module.exports的关系砍断了
// 	a:1,
// 	b:10
// }

// module.exports = {//正常导出
// 	a:1,
// 	b:10
// }

// 对象
var obj1 = {x:1,y:2};

// 地址引用，指向同一个内存地址
vaf obj2 = obj1;
obj2.z = 11;//obj1也被改变，强引用关系obj1，obj2  ，在原来的地址上增加了个z

obj2 = {
	z:11  //obj1没被改变，原因在把obj2指向了一个新的地址，和obj1没有任何的关联关系
}


/*
	模块化--分类
		File Modules
		Folders as Module
			node_modules Folder
			global folders
		Core Modules
	
	模块化-- 模块加载机制		
		路径加载模式
			/
			./
			../
		非路径加载模式
			node_modules
			全局目录
			核心模块
	模块化--模块加载机制(后缀)
		模块文件后缀处理机制
			文件-> .js -> .json -> .node

*/


/*
	模块化--es6模块系统
		开启支持
			--experimental-modules
			.mjs后缀
			

*/
