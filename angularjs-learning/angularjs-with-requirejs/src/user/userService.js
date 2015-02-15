
define(function (require) {

    var app = angular.module('app')
        .factory('userService', function () {
            return {
                user: {
                    name: 'guoyao'
                }
            };
        });

    return app;
});
