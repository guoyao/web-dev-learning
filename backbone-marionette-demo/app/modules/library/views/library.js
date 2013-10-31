define(function (require) {
    "use strict";

    // external dependencies
    var $ = require("jquery"),
        _ = require("underscore"),
        Marionette = require("marionette"),
        Library = require("modules/library/collections/library"),
        BookView = require("modules/library/views/book"),
        libraryTemplate = require("text!templates/library.html");

    var LibraryView = Marionette.CompositeView.extend({
        template: libraryTemplate,
        itemView: BookView,
        itemViewContainer: '#books',
        ui: {
            releaseDate: '#releaseDate',
            inputs: '#addBook div input',
            searchInput: '#search-input'
        },
        events: {
            'click #add': 'addBook',
            'click #search-btn': 'search'
        },

        initialize: function () {
            this.collection = new Library();
            this.collection.fetch();
            this.collection.on("reset", function () {
                var searchString = this.ui.searchInput.val();
                if (searchString && searchString.trim().length > 0) {
                    var books = this.collection.filter(function (book) {
                        return book.get("title").indexOf(searchString) != -1;
                    });
                    this.collection.set(books);
                }
            }, this);
        },

        onRender: function () {
            this.ui.releaseDate.datepicker();
        },

        addBook: function (e) {
            e.preventDefault();
            var formData = {},
                releaseDate = this.ui.releaseDate;
            this.ui.inputs.each(function (i, el) {
                var $el = $(el);
                if ($el.val() !== '') {
                    if (el.id === 'keywords') {
                        formData[el.id] = [];
                        _.each($el.val().split(' '), function (keyword) {
                            formData[el.id].push({'keyword': keyword});
                        });
                    } else if (el.id === 'releaseDate') {
                        formData[el.id] = releaseDate.datepicker('getDate').getTime();
                    } else {
                        formData[el.id] = $el.val();
                    }
                }
                // Clear input field value
                $el.val('');
            });
            this.collection.create(formData);
        },

        search: function() {
            var searchString = this.ui.searchInput.val();
            this.collection.fetch({reset: searchString && searchString.trim().length > 0});
        }
    });

    return LibraryView;
});

