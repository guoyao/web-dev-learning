var app = angular.module('myApp', []).run(function ($rootScope) {
    $rootScope.user = {
        name: 'hello world'
    };
});