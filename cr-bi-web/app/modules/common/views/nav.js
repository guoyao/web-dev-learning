define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/common/nav.html");

    var view = Marionette.ItemView.extend({
        template: template,
        className: "grid-medium",
        ui: {
          menu: ".gui-nav"
        },
        onShow: function () {
            this.ui.menu.guiNav();
        }
    });

    return view;
});