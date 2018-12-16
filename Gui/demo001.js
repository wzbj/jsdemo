/*
	GUI
		图形用户界面(Graphical User Interface,简称GUI，又称图形用户接口)
		是指定用图形方式显示的计算机操作用户界面
		与CLi相比，图形界面对于普通用户在视觉和操作上更加容易接受
	基于node.js的GUI框架
		NW.js（node-webkit）
		Electron
		使用HTML，长沙市，JavaScript来构建UI，处理与用户的交互，同时不约而同的使用了开源浏览器chromium
		使用node.js来访问浏览器之外的内容，比如系统，文件，网络等
*/

/*
	主进程与渲染进程
		在Electron中，被Electron直接运行的脚本(package.json中指定的main脚本)被称为主进程
		在electron中用来展示界面的web页面都运行在一个独立的，属于它自己的渲染进程中
		我们可以通过主进程来创建web页面，但一个web页面被销毁的时候，对饮过的渲染进程也会被终止
		主进程管理所有的web页面和它们对应的渲染进程
		一个应用程序有且仅有一个主进程

	Electron&Node.js
		在Electron中，Electron同时为主进程与渲染进程暴露了node.js的所有接口，也就是说，我们可以在
		Electron的主进程与渲染进程中使用node.js的API

*/

/*
	app对象
	
*/