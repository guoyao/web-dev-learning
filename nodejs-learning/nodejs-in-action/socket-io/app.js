var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

function handler(req,res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html,'utf8'));
    res.end(html);
}

function tick() {
    var now = new Date();
    io.sockets.send(now.toString());
    io.sockets.emit('custom-event', now.toString());
}

setInterval(tick, 1000);

io.sockets.on('connection', function(socket) {
    console.log('socket connected');
    socket.on('message', function(message) {
        console.log(message);
    });
});

app.listen(3001);
