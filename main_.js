var fs = require('fs');
var path = require('path');

require('http').createServer(function(request, response) {
  fs.readFile(path.resolve(__dirname, './default.html'), function(err, data){
    if(err){
      response.writeHead(500);
      response.end('Internel Error');
    }else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(data.toString());
    }
    
  })
}).listen(); // ace 中的 http 服务无需填写端口号

