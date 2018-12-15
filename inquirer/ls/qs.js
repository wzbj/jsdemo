/*
	Inquirer
		交互式命令，提问用户，收集用户输入数据


*/

const inquirer = require('inquirer');


// 提问用户，与用户进行命令行的交互
// .prompt(questions) questions是个数组，prompt数组中存放一个指定格式的对象，我们称为question对象
/*
	questions:
		type:提问类型,input,confirm,list,rawlist,expand,chekbox,password,editor
		name:问题名称
		message：问题文字，给用户看
		default:默认值
		choices：选项
		validate:输入验证
		filter：数据过滤

		cmd批处理，bat
		windows bat脚本

*/
inquirer.prompt([
	{
		type:'input',
		name:'username',
		message:'请输入你的应用名称:',
		default:'app',
		validate(val){//验证
			console.log(val);
			if(val.trim() === ''){
				return '应用名称不能为空';
			}
			return true;
		},
		// 对用户输入的数据或选择的数据进行过滤
		filter(val){
			return val.toLowerCase();
		}
	},{
		type:'confirm',
		name:'useES6',
		message:'是否使用es6',
		default:true
	},{
		type:'list',
		name:'framework',
		message:'请选择框架',
		choices:['Vue','React','Angular'],
		default:0
	}
	// ,{
	// 	type:'rawlist',
	// 	name:'framework1',
	// 	message:'请选择框架2',
	// 	choices:['Vue','React','Angular'],
	// 	default:0
	// }
	,{
		type:'checkbox',
		name:'tools',
		message:'开发工具',
		choices:[
			{
				name:'使用ESlint',
				value:'eslint',
				checked:true
			},
			{
				name:'使用mock数据',
				value:'mock'
			}
		],
		default:true
	},

]).then(answers=>{
	console.log(answers);
})