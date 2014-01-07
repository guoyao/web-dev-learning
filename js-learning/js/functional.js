/**
 * Author: guoyao
 * Time: 08-15-2013 00:10
 * Blog: http://www.guoyao.me
 */

(function (window) {
    "use strict";

    var console = window.console;

    function toArray(value) {
        return Array.prototype.slice.call(value);
    }

    function unsplat(fun) {
        return function() {
            return fun.call(null, toArray(arguments));
        };
    }
    var joinElements = unsplat(function(array) { return array.join(' ') });
    console.debug(joinElements(1, 2));
    console.debug(joinElements('-', '$', '/', '!', ':'));

    var Class = function () {
        var klass = function () {
            this.init.apply(this, arguments);
        };

        klass.prototype.init = function () {
            console.debug("init called");
        };

        klass.extend = function (obj) {
            for (var i in obj) {
                klass[i] = obj[i];
            }
        };

        return klass;
    };

    var func = function func () {
//        this.name = 1;
    };

    func.name = 1111;

    var Person = new Class;
    Person.extend({age: 27});
    console.debug(Person.age);
//    var person = new Person();

    function substitute(value) {
        if (value) {
            var args = arguments,
                pattern = new RegExp("{([0-" + (arguments.length - 2) + "])}", "g");

            return value.replace(pattern, function (match, index) {
                console.log(match);
                console.log(index);
                return  args[parseInt(index, 10) + 1];
            });
        }

        return value;
    }

    console.log(substitute("{1}//{0}#/index", window.location.protocol, window.location.host));

})(window);