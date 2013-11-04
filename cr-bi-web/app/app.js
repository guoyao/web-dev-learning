define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette");

    var app = new Marionette.Application();

    console.log(111);

    app.addRegions({
        header: "#header",
        main: "#main",
        footer: "#footer"
    });

    app.on("initialize:before", function (options) {
        // do something before initialize
//        window.location.replace("login.html");
    });

    app.on("initialize:after", function (options) {
        Backbone.history.start();
    });

    return app;

});
