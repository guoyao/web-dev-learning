define(function (require) {
    'use strict';

    var app = require('app');

    var UserController = app.controller('UserController', function ($scope) {
        $scope.user = {
            name: 'guoyao'
        };
    });

    return UserController;
});