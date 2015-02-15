define(function (require) {
    'use strict';

    var app = require('app');

    app.config(['$routeProvider', function ($routeProvider) {
        console.log(1);
        $routeProvider
            .when('/', {
                templateUrl: 'user/user.tpl.html',
                controller: 'UserController'
            });
    }]);
});
