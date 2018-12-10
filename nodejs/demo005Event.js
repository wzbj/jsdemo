/*
	Event
		事件是整个node.js的核心，node.js中大部分模块都使用或继承了该模块(类似)
		使用：
			require('event')
		EventEmitter类
		.emit(eventName[,...args])
		.addListener(eventName,listener)
		.on(eventName,listener)
		.off(eventName,listener)
		.removeListener(eventName,listener)
*/

const EventEmmiter = require('events');

class Person extends EventEmmiter{
	constructor(name){
		super();
		this.name = name;
		this.age = 0;

		this.growup();
	}

	growup(){
		setInterval(()=>{
			this.age++;
			this.emit('growup');
		},1000)
	}


}

p1.setMaxListeners(1);//最大监听数

const p1 = new Person('wzz');

p1.addListener('growup',function(){
	console.log('长大了一岁');
})

console.log(p1.eventNames());//返回当前