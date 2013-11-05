define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette");

    var Application = Marionette.Application.extend({
        removeAllInitializers: function () {
            this._initCallbacks = new Marionette.Callbacks();
        }
    }), app = new Application();

    app.addRegions({
        header: "#header",
        main: "#main",
        footer: "#footer"
    });

    app.on("initialize:before", function (options) {
        // do something before initialize
        var location = window.location;
        if (location.pathname.indexOf("login.html") == -1) {
            app.removeAllInitializers();
            app.off();
            location.replace("login.html");
        }
    });

    app.on("initialize:after", function (options) {
        Backbone.history.start();
    });

    return app;
});
