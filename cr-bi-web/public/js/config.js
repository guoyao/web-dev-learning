// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    baseUrl: "js",
    paths: {
        // Map dependencies.
        "json2": "libs/json2",
        "jquery": "libs/jquery",
        "underscore": "libs/underscore", // Opt for Lo-Dash Underscore compatibility build over Underscore.
        "backbone": "libs/backbone"
    },
    shim: {
        // This is required to ensure Backbone works as expected within the AMD environment.
        "backbone": {
            // These are the two hard dependencies that will be loaded first.
            deps: ["jquery", "underscore"],

            // This maps the global `Backbone` object to `require("backbone")`.
            exports: "Backbone"
        },
        "json2": {
            exports: "json2"
        }
    }
});
