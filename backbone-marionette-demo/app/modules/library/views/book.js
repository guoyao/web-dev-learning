define(function (require) {
    "use strict";

    // external dependencies
    var _ = require("underscore"),
        Marionette = require("marionette"),
        bookTemplate = require("text!templates/book.html");

    var BookView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'bookContainer',
        template: _.template(bookTemplate),
        events: {
            'click .delete': 'deleteBook'
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