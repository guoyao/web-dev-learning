define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/index/main.html");

    var view = Marionette.ItemView.extend({
        template: template
    });

    return view;
});