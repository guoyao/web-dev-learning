require(["common"], function () {
    "use strict";

    require([
        "modules/index/router",
        "modules/index/controller",
        "modules/index/views/main"
    ], function (Router, Controller, IndexMainView) {
        // load external dependencies
        var app = require("app");

        app.addInitializer(function () {
            app.main.show(new IndexMainView());
        });

        new Router({controller: Controller});

        app.start();
    });

});