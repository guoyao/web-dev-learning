define(function () {
    // external dependencies
    var Backbone = require("backbone"),
        Book = require("../models/book");

    var library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });

    return library;
});