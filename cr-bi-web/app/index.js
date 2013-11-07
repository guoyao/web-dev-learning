require(["common"], function () {
    "use strict";

    require([
        "modules/index/router",
        "modules/index/controller",
        "modules/index/views/main"
    ], function (Router, Controller, IndexMainView) {
        // load external dependencies
        var app = require("app"),
            HeaderView = require("modules/common/views/header"),
            FooterView = require("modules/common/views/footer");

        new Router({controller: Controller});

        app.addInitializer(function () {
            app.header.show(new HeaderView());
            app.main.show(new IndexMainView());
            app.footer.show(new FooterView());
        });

        app.start();
    });

});