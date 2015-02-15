var app = angular.module('myApp')
    .factory('userService', function () {
        return {
            user: {
                name: 'guoyao'
            }
        };
    });