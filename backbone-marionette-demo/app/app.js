define(function (require) {
    "use strict";

    var Backbone = require("backbone"),
        Marionette = require("marionette");

    var Application = Marionette.Application.extend({
        // The root path to run the application through.
        root: "/"
    });

    var app = new Application();

    app.addRegions({
        header: "#header",
        main: "#main",
        footer: "#footer"
    });

    app.on("initialize:before", function (options) {
        // do something before initialize
    });

    app.on("initialize:after", function (options) {
        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        Backbone.history.start({ pushState: true, root: app.root });
    });

    return app;

});
