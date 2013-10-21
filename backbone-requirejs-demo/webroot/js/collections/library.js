define(["../models/book"], function (Book) {
    var library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });
    return library;
});