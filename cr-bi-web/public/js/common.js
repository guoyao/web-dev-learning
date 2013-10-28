// merge dependencies to single file
define(function () {
    "use strict";

    // External lib dependencies.
    require("text");
    require("jquery");
    require("json2");
    require("underscore");
    require("backbone");

    // App common dependencies
    require("config");
    require("router");
    require("app");
});
