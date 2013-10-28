define(function () {
    // external dependencies
    var _ = require("underscore"),
        Backbone = require("backbone"),
        bookTemplate = require("text!../../../templates/book-template.html");

    var BookView = Backbone.View.extend({
        tagName: 'div',
        className: 'bookContainer',
        template: _.template(bookTemplate),
        events: {
            'click .delete': 'deleteBook'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteBook: function () {
            // Delete model
            this.model.destroy();
            // Delete view
            this.remove();
        }
    });

    return BookView;
});