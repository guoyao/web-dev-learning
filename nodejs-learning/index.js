/**
 * User: guoyao
 * Time: 06-19-2013 14:08
 * Blog: http://www.guoyao.me
 */

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');