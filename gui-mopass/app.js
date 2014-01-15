/**
 * Author: guoyao
 * Time: 10-22-2013 18:26
 * Blog: http://www.guoyao.me
 */

var application_root = __dirname,
    http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    port = (process.env.VMC_APP_PORT || 3000),
    host = (process.env.VCAP_APP_HOST || 'localhost');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(application_root));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
