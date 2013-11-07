define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/common/footer.html"),
        util = require("utils/util"),
        appInfo = require("app_info");

    var intervalId;

    var view = Marionette.ItemView.extend({
        template: template,
        ui: {
            username: "#username",
            loginDuration: "#loginDuration"
        },
        onRender: function () {
            this.ui.username.text(appInfo.loginInfo.userInfo.toString());
            this.startTrack();
        },
        startTrack: function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
            var loginTime = appInfo.loginInfo.loginDate.getTime(),
                view = this;
            intervalId = setInterval(function () {
                var timeDiff = new Date().getTime() - loginTime,
                    hours = Math.floor(timeDiff / util.dateTime.MILLSECONDS_OF_HOUR),
                    minutes = Math.floor((timeDiff - hours * util.dateTime.MILLSECONDS_OF_HOUR) / util.dateTime.MILLSECONDS_OF_MINUTE),
                    seconds = Math.floor((timeDiff - hours * util.dateTime.MILLSECONDS_OF_HOUR - minutes * util.dateTime.MILLSECONDS_OF_MINUTE) / util.dateTime.MILLSECONDS_OF_SECOND);
                view.ui.loginDuration.text(util.dateTime.toPretty(hours) + " : " + util.dateTime.toPretty(minutes) + " : " + util.dateTime.toPretty(seconds));
            }, util.dateTime.MILLSECONDS_OF_SECOND);
        }
    });

    return view;
});