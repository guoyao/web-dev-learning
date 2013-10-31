define(function (require) {
    "use strict";

    // external dependencies
    var Backbone = require("backbone"),
        Book = require("modules/library/models/book");

    var library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books',
        comparator: function (book) {
            return book.get('releaseDate');
        }
    });

    return library;
});