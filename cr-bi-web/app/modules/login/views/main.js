define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/login/main.html"),
        gui = require("gui");

    var view = Marionette.CompositeView.extend({
        template: template,
        className: "login",
        ui: {
            loginPanel: ".gui-panel"
        },
        onRender: function () {
            if (gui.browserInfo.isIE) {
                if (gui.browserInfo.version <= 7) { // lte IE 7
                    this.ui.loginPanel.guiPanel();
                }
            }
        }
    });

    return view;
});