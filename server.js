
const port = Number(process.argv[2]) || 1024;
const host = '127.0.0.1';
const filename = './files/proxy.pac';

console.info(`http://${host}:${port}/`);

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	if (req.url === '/favicon.ico') {
		res.end();
	} else {
		console.info(`[${new Date().toLocaleString()}] ${req.url}`);
		fs.createReadStream(filename).on('error', err => {
			console.error('File Not Found', err);
			res.writeHead(404, {
				'Content-Type': 'text/plain',
			});
			res.write(`File Not Found\n${filename}`);
			res.end();
		}).once('data', () => {
			res.writeHead(200, {
				'Content-Type': 'text/plain',
			});
		}).pipe(res);
	}
}).listen(port, host);
