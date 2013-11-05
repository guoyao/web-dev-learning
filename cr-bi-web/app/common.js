// merge dependencies to single file
define(function () {
    "use strict";

    // load external lib dependencies.
    require("text");
    require("jquery");
    require("json2");
    require("underscore");
    require("backbone");
    require("marionette");
    require("gui");

    // load application common dependencies
    require("config");
    require("app");
});