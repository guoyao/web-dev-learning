define(function (require) {
    "use strict";

    // External dependencies.
    var Backbone = require("backbone");

    // Defining the application router.

    return  Backbone.Router.extend({
        routes: {
            "": "index"
        },
        index: function () {
            console.log("Welcome to your / route.");
        }
    });
});
