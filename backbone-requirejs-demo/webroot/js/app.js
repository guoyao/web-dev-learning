requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    },
    shim: {
        "json2": {
            exports: "json2"
        },
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "jquery-ui": {
            deps: ["jquery"]
        },
        "jquery.dateFormat": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", "../views/library", "jquery-ui", "jquery.dateFormat"], function ($, LibraryView) {
    $('#releaseDate').datepicker();
    new LibraryView();
});