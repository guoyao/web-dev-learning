require(["common"], function () {
    "use strict";

    require(["modules/library/views/library"], function (LibraryView) {
        var Backbone = require("backbone"),
            app = require("app"),
            Router = require("router");

        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        app.router = new Router();

        new LibraryView();

        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        Backbone.history.start({ pushState: true, root: app.root });
    });

});