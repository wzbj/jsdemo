/*
	stream
		流(stream)是一种在node.js中处理流式数据的抽象接口。stream模块提供了一些基础的API，
		用于构建实现了流接口的对象，Node.js中许多的对象都是提供了流的实现：
			fs文件操作，net,dgram,http,https等
		使用：require('stream')
	流的基本类型
		Writable-可写入数据的流，例如：fs.createWriteStream()
		Readable-可读取数据的流吧，例如：fs.createReadStream()
		Duplex- 可读又可写的流，例如：net.Socket
		Transform-在读写过程中可以修改或转换数据Duplex流，例如：zlib.createDeflate()

	Writable属性方法
		.write(chunk,[,encoding][,callback])
		.end(chunk,[,encoding][,callback])
		.setDefaultEncoding(encoding)
	Writable事件

	Readable属性方法
		.setEncoding(encoding)
		.read([size])
		.pipe(destination[,options])
		.pause()
		.resume()
	Readable事件

*/