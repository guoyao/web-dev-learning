// merge dependencies to single file
define(function (require) {
    "use strict";

    // External lib dependencies.
    require("text");
    require("json2");
    require("jquery");
    require("underscore");
    require("backbone");
    require("marionette");
    require("jquery-ui");
    require("jquery.dateFormat");

    // App common dependencies
    require("config");
    require("router");
    require("app");
});

