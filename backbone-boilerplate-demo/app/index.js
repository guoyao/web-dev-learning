// Break out the application running from the configuration definition to
// assist with testing.
require(["common"], function () {
    "use strict";

    // Kick off the application.
    require(["modules/library/views/library"], function (LibraryView) {
        var $ = require("jquery"),
            Backbone = require("backbone"),
            app = require("app"),
            Router = require("router");

        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        app.router = new Router();

        $('#releaseDate').datepicker();
        new LibraryView();

        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        Backbone.history.start({ pushState: true, root: app.root });
    });

});