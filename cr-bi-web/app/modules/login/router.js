define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette");

    var router = Marionette.AppRouter.extend({
        appRoutes: {
            "*path": "login"
        }
    });

    return router;
});