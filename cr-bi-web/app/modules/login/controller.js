define(function () {
    "use strict";

    return {
        login: function (param) {
            param = param || "/";
            console.log("Welcome to " + param + " route.");
        }
    };
});
