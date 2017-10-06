
const port = 1024;
const host = '127.0.0.1';
const filename = './files/proxy.pac';

console.info(`http://${host}:${port}/`);

const http = require('http'),
	fs   = require('fs');

http.createServer((req, res) => {
	if (req.url === '/favicon.ico') {
		res.end();
	} else {
		console.info(`[${new Date().toLocaleString()}] ${req.url}`);
		fs.exists(filename, (exists) => {
			if (exists) {
				fs.readFile(filename, 'utf8', (err, file) => {
					if (err) {
						res.writeHead(404, {
							'Content-Type': 'text/plain',
						});
						res.write(`File Not Found\n${filename}\nerr: ${err}`);
						res.end();
					} else {
						res.writeHead(200, {
							'Content-Type': 'text/plain',
						});
						res.write(file);
						res.end();
					}
				});
			} else {
				res.writeHead(404, {
					'Content-Type': 'text/plain',
				});
				res.write(`File Not Found\n${filename}`);
				res.end();
			}
		});
	}
}).listen(port, host);
