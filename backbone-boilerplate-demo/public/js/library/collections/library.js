define(["backbone", "../models/book"], function (Backbone, Book) {
    var library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });
    return library;
});