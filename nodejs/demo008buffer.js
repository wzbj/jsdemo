/*
	Buffer
		用于操作二进制数据的类
			-类似数组
			-长度固定
			-只能操作二进制数据
		Buffer类在Node.js中是一个全局变量，因此无需require
	
	Buffer.alloc(size,[,fill[,encoding]])
		分配一个大小为size字节的新建的buffer，如果fill为undefined，则该buffer会用0填充，
		encoding为'utf-8'
		Buffer也有下标，可以通过buf[index]进行操作
		length：字节长度，非字符长度


*/

/*
	位 -> 字节
	位能存0&1 -> 8位
	00000000  -> 11111111
*/

// let bf1 = new Buffer(8);
// console.log(bf1);

// let bf2 = new Buffer('wz');
// console.log(bf2);


// let bf4 = new Buffer(10);
// bf4.fill(96,2,4);//默认以0填充
// console.log(bf4);


let bf5 = Buffer.from('wz');
let bf6 = Buffer.from('wz');
console.log(bf5==bf6);//比较地址false

console.log(bf5.equals(bf5));//比较的是值true

console.log('苗伟'.length);
console.log(Buffer.byteLength('苗伟'))