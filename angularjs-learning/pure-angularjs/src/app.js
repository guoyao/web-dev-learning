angular.module('myApp', [])
    .controller('ServiceController', function ($scope, userService) {
        $scope.user = userService.user;
    });
