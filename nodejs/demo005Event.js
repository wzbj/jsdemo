/*
	Event
		事件是整个node.js的核心，node.js中大部分模块都使用或继承了该模块(类似)
		使用：
			require('event')
*/

const EventEmmiter = require('events');

class Person{
	constructor(name){
		this.name = name;
		this.age = 0;

		this.growup();
	}

	growup(){
		setInterval(()=>{
			this.age++;
		},1000)
	}


}

const p1 = new Person('wzz');

p1.addListener('growup',function(){

})