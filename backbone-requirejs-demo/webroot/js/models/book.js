define(["backbone"], function (Backbone) {
    var Book = Backbone.Model.extend({
        defaults: {
            coverImage: 'assets/images/placeholder.jpg',
            title: 'No title',
            author: 'Unknown',
            releaseDate: 'Unknown',
            keywords: 'None'
        },
        parse: function(response) {
            response.id = response._id;
            return response;
        }
    });
    return Book;
});
