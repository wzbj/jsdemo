
const commander = require('commander');
/*
	commander
		.version(str,flags?)	
			设置版本信息，该方法会自动为命令注册一个-V,--version的option
			str：版本号
			flags:指定的option，默认为："-V,--version"
		.option(flags,description?,fn?,defaultValue?)
			设置命令选项
			flags:选项标记名称，"-v,--version"
			description:选项使用说明
			fn:默认值，函数返回值为defaultValue，优先级高于defaultValue
			defaultValue:选项默认值，如果需要的话

*/
// 设置当前命令的版本
commander.version('1.0.0','-v,--version');//默认是-V

// 设置option
// commander.option('-n,--name <val>','打印名称','zmouse');// <>是必填，[]是可选

// 如果第三个参数是函数的话，那么该函数会接受来自用户输入的值，并返回一个值作为最后这个选项实际的值
commander.option('-n,--name <val>','打印名称', (val) => {// node demo011 -n hh
	console.log(val);
	return val.toUpperCase();
	// return 'zmouse';
});// <>是必填，[]是可选




/*
	commander



*/
// 设置命令的动作，用action
commander.action(() => {
	console.log('hello ' + commander.name);
})



// 解析来自process.argv上的数据
commander.parse(process.argv);

// console.log(commander);

// if(commander.name === 'zmouse'){

// }
