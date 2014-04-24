var connect = require('connect');

var app = connect()
    .use(logger)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);

function logger(req, res, next) {
    console.log(req.url);
    next();
}

function admin(req, res, next) {
    console.log('admin page');
    next();
}

function hello(req, res) {
    res.end('hello world\n');
}

console.log('server start on port: %s', 3000);

