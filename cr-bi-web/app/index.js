require(["common"], function () {
    "use strict";

    require([
        "modules/index/router",
        "modules/index/controller",
        "modules/index/views/main"
    ], function (Router, Controller, IndexMainView) {
        // load external dependencies
        var app = require("app");

        new Router({controller: Controller});

        app.addInitializer(function () {
            app.main.show(new IndexMainView());
        });

        app.start();
    });

});