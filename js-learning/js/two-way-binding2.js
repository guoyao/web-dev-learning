/**
 * Author: guoyao
 * Time: 03-04-2014 15:12
 * Blog: http://www.guoyao.me
 */

(function () {

    var _ = {
            toArray: function (value) {
                return Array.prototype.slice.call(value);
            },
            isFunction: function (value) {
                return Object.prototype.toString.call(value) === "[object Function]";
            },
            extend: function (destination, source) {
                for (var property in source) {
                    destination[property] = source[property];
                }
                return destination;
            }
        },
        Class = (function () {
            var tempFunc = function () {},
                emptyInitializeFunc = function () {};

            function Class() {
                var superclass = null,
                    properties = _.toArray(arguments);

                if (_.isFunction(properties[0])) {
                    superclass = properties.shift();
                }

                function klass() {
                    this.initialize.apply(this, arguments);
                }

                if (superclass) {
                    tempFunc.prototype = superclass.prototype;
                    klass.prototype = new tempFunc();
                    klass.superclass = superclass.prototype;
                }

                for (var i = 0, length = properties.length; i < length; i++) {
                    _.extend(klass.prototype, properties[i]);
                }

                if (!klass.prototype.initialize) {
                    klass.prototype.initialize = emptyInitializeFunc;
                }

                klass.prototype.constructor = klass;

                return klass;
            }

            return Class;
        })(),
        EventUtil = {
            on: function (element, type, handler) {
                if (document.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (document.attachEvent) {
                    element.attachEvent("on" + type, handler);
                } else {
                    element["on" + type] = handler;
                }
            },
            getEvent: function (e) {
                return e || window.event;
            },
            getTarget: function (e) {
                var event = this.getEvent(e);
                return event.target || event.srcElement;
            }
        },
        DataBinder = function (objectId) {
            var binder = {
                    callbacks: {},
                    subscribe: function (message, callback) {
                        this.callbacks[message] || (this.callbacks[message] = []);
                        this.callbacks[message].push(callback);
                    },
                    publish: function (message) {
                        this.callbacks[message] || (this.callbacks[message] = []);
                        for (var i = 0, len = this.callbacks[message].length; i < len; i++) {
                            this.callbacks[message][i].apply(this, arguments);
                        }
                    }
                },
                message = objectId + ":change";

            EventUtil.on(document, "input", function (e) {
                var target = EventUtil.getTarget(e),
                    bindInfo = target.getAttribute("data-bind");
                if (bindInfo.indexOf(objectId) !== -1) {
                    binder.publish(message, bindInfo.split(".")[1], target.value);
                }
            });

            binder.subscribe(message, function (message, prop, value) {
                var elements = document.querySelectorAll("[data-bind='" + objectId + "." + prop + "']"),
                    i, element, tagName;
                for (i = 0; element = elements[i]; i++) {
                    tagName = element.tagName.toLowerCase();
                    if (tagName === "input" || tagName === "textarea") {
                        element.value = value;
                    } else {
                        element.innerHTML = value;
                    }
                }
            });

            return binder;
        },
        Bindable = new Class({
            initialize: function (objectId) {
                this._objectId = objectId;
                this._attributes = {};
                this._binder = new DataBinder(objectId);
            },
            set: function (prop, value) {
                this._attributes[prop] = value;
                this._binder.publish(this._objectId + ":change", prop, value);
            },
            get: function (prop) {
                return this._attributes[prop];
            }
        }),
        User = new Class(Bindable),
        user = new User("user");

    user.set("name", "hello world");

    EventUtil.on(document.getElementById("changeModelPropertyButton"), "click", function () {
        user.set("name", "hello " + Math.round(Math.random() * 100));
    });

})();