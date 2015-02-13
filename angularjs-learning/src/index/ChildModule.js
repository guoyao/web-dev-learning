(function (angular) {

    var ParentModule = angular.module('ParentModule', []);

//    var ChildModule = angular.module('ChildModule', ['ParentModule', function (ParentModule) {
//        console.log(11);
////        console.log(ParentModule);
//    }]);

    var ChildModule = angular.module('ChildModule', []).factory('alert', function ($window) {
        console.log(12);
        return function (text) {
            $window.alert(text);
        };
    }).value('salutation', 'Hello')
        .factory('greet', function (alert, salutation) {
            return function (name) {
                alert(salutation + ' ' + name + '!');
            };
        });

    console.log(ChildModule);

}(angular));