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
        "jquery.dateFormat": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", "../views/library", "jquery-ui"], function ($, LibraryView) {
    $('#releaseDate' ).datepicker();
    new LibraryView();
});