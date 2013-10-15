/**
 * Author: guoyao
 * Time: 10-15-2013 18:06
 * Blog: http://www.guoyao.me
 */

var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    initialize: function () {
        this.on('change', function () {
            console.log('- Values for this model have changed.');
        });
        this.on("invalid", function (model, error) {
            console.log(error);
        });
    },
    validate: function (attrs) {
        if (!attrs.title) {
            return "title is not filled"
        }
    }
});

var myTodo = new Todo({title: "test title"});

var TodoView = Backbone.View.extend({
    el: ".container",
    render: function () {
        this.$el.html("hello backbone!")
    }
});

var myTodoView = new TodoView();
myTodoView.render();

var Todos = Backbone.Collection.extend({
    filterById: function (ids) {
        return this.models.filter(
            function (model) {
                return _.contains(ids, model.id);
            });
    }
});

var TodoRouter = Backbone.Router.extend({
    routes: {
        "todo/:id": "viewTodo",
        "todo/:id/edit": "editTodo"
    },
    viewTodo: function (id) {
        console.log("View todo requested.");
        this.navigate("todo/" + id + '/edit');
    },
    editTodo: function (id) {
        console.log("Edit todo opened.");
    }
});
var myTodoRouter = new TodoRouter();
Backbone.history.start();

Backbone.history.on('route', function () {
    console.log("route");
});
// Trigger 'route' event on router instance."
myTodoRouter.on('route', function(name, args) {
    console.log(name === 'routeEvent');
});
location.replace("http://baidu.com/");
Backbone.history.checkUrl();

