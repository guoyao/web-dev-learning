define(function () {
    "use strict";

    // external dependencies
    var Backbone = require("backbone"),
        Book = require("modules/library/models/book");

    var library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });

    return library;
});