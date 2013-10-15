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
//        console.log('This model has been initialized.');
        this.on('change', function () {
            console.log('- Values for this model have changed.');
        });
    }
});

var myTodo = new Todo();
//myTodo.set('title', 'The listener is triggered whenever an attribute value changes.');
//console.log('Title has changed: ' + myTodo.get('title'));
//myTodo.set('completed', true);
//console.log('Completed has changed: ' + myTodo.get('completed'));
myTodo.set({
    title: 'Changing more than one attribute at the same time only triggers the listener once.',
    completed: true
}, {silent: true});

console.log(myTodo.hasChanged());