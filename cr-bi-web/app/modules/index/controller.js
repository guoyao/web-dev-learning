define(function () {
    "use strict";

    return {
        index: function (param) {
            param = param || "/";
            console.log("Welcome to " + param + " route.");
        }
    };
});
