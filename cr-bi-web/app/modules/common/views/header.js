define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/common/header.html"),
        util = require("utils/util");

    var view = Marionette.CompositeView.extend({
        template: template,
        events: {
            "click #logoutBtn": "logout"
        },
        logout: function () {
            util.app.logout();
        }
    });

    return view;
});