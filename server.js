
var port = 1024;
var host = "127.0.0.1";

console.log(`http://${host}:${port}/`);

var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain"
	});
	res.write("Hello");
	res.end();
}).listen(port, host);