
var port = 1024;
var host = "127.0.0.1";
var filename = "./files/proxy.pac";

console.log(`http://${host}:${port}/`);

var http = require('http'),
	fs   = require("fs");

http.createServer(function(req, res) {
	console.log(`[${new Date().toLocaleString()}] ${req.url}`);
	fs.exists(filename, function (exists) {
		if (exists) {
			fs.readFile(filename, "utf8", function (err, file) {
				if (err) {
					res.writeHead(404, {
						"Content-Type": "text/plain"
					});
					res.write(`File Not Found\n${filename}\nerr: ${err}`);
					res.end();
				} else {
					res.writeHead(200, {
						"Content-Type": "text/plain"
					});
					res.write(file);
					res.end();
				}
			});
		} else {
			res.writeHead(404, {
				"Content-Type": "text/plain"
			});
			res.write(`File Not Found\n${filename}`);
			res.end();
		}
	});
}).listen(port, host);