define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/common/header.html"),
        util = require("utils/util");

    var view = Marionette.ItemView.extend({
        template: template,
        className: "header",
        events: {
            "click #logoutBtn": "logout"
        },
        onRender: function () {
            this.iePatch();
        },
        logout: function () {
            util.app.logout();
        },
        iePatch: function () {
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
                this.$el.guiAffix({
                    offset: 0
                });
            }
        }
    });

    return view;
});