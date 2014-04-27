var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.bodyParser());

app.use(express.basicAuth('guoyao', '123456'));

app.param('user', function(req, res, next, user) {
    req.user = 'guoyao';
    next();
});

app.get('/:user', function(req, res) {
    res.end(req.params.user + ' ' + req.user);
});

app.get('/admin/:user1', function(req, res) {
    //res.end(req.params.user1 + ' ' + req.user);
    res.format({
	'text/plain': function() {
	    res.send('hey plain text');
	},
      
	'text/html': function() {
	    res.send('hey html text');
	},
      
	'application/json': function() {
	    res.send({ message: 'hey' });
	},
        '*/*': function() {
	    res.send(app.routes);
        }
    });
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
