

var projectData = {
	'name':'test',
	'fileData':[
		{
			'name':'css',
			'type':'dir'
		},
		{
			'name':'js',
			'type':'dir'
		},
		{
			'name':'img',
			'type':'dir'
		},
		{
			'name':'index.html',//\t是一个缩进；
			'type':'file',
			'content':'<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\n\t</body>\n</html>'
		}
	]
}

var fs = require('fs');
if(projectData.name){
	fs.mkdirSync(projectData.name);
	var fileData = projectData.fileData;
	if(fileData && fileData.forEach){
		fileData.forEach(function(f){
			f.path = projectData.name + '/' + f.name;
			f.content = f.content || '';
			switch(f.type){
				case 'dir':
					fs.mkdirSync(f.path)
					break;
				case 'file':
					fs.writeFileSync(f.path,f.content);
					break;
				default:
					break;
			}
		})
	}
}