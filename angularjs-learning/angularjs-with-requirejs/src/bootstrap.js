require.config({
    baseUrl: './',
    paths: {
        'angular': '../../dep/angularjs/angular',
        'angular-route': '../../dep/angular-route/angular-route'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route']
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});

require(['app', 'routes'], function () {
    'use strict';

    angular.bootstrap(document, ['app']);
});