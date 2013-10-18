/**
 * Author: guoyao
 * Time: 10-18-2013 15:54
 * Blog: http://www.guoyao.me
 */

var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    app = express(),
    port = 3000;

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, 'webroot')));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});