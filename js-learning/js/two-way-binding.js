/**
 * Author: guoyao
 * Time: 03-04-2014 15:12
 * Blog: http://www.guoyao.me
 */

(function () {
    var changeModelPropertyButton = document.getElementById("changeModelPropertyButton"),
        user = {
            name: "hello",
            age: 1
        }, binder;

    function DataBinder(data, objectId, bindableProperties) {
        this.data = data;
        this._objectId = objectId;
        this.bindableProperties = Object.prototype.toString.call(bindableProperties) === "[object Array]" ?  bindableProperties : [];
        if (this.bindableProperties.length === 0) {
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    this.bindableProperties.push(prop);
                }
            }
        }
        this._initialize();
    }

    DataBinder.prototype._initialize = function () {
        var _this = this;
        document.addEventListener("input", function (event) {
            var target = event.target,
                tagName = target.tagName.toLowerCase();
            for (var i = 0, len = _this.bindableProperties.length; i < len; i++) {
                if (target.getAttribute("data-bind") === _this._objectId + "." + _this.bindableProperties[i]) {
                    if (tagName === "input" || tagName === "textarea") {
                        _this.set(_this.bindableProperties[i], target.value);
                    } else {
                        _this.set(_this.bindableProperties[i], target.innerHTML);
                    }
                    break;
                }
            }
        }, false);
    };

    DataBinder.prototype.set = function (prop, value) {
        var elements,
            element,
            tagName;
        if (this.data[prop] !== value) {
            this.data[prop] = value;
            if (this.bindableProperties.indexOf(prop) !== -1) {
                elements = document.querySelectorAll("[data-bind='" + this._objectId + "." + prop + "']");
                for (var i = 0, len = elements.length; i < len; i++) {
                    element = elements[i];
                    tagName = element.tagName.toLowerCase();
                    if (tagName === "input" || tagName === "textarea") {
                        element.value = value;
                    } else {
                        element.innerHTML = value;
                    }
                }
            }
        }
        return this;
    };
    DataBinder.prototype.get = function (prop) {
        return this.data[prop];
    };

    changeModelPropertyButton.addEventListener("click", function () {
        binder.set("name", "hello" + Math.round(Math.random() * 100));
    }, false);

    binder = new DataBinder(user, "user", ["age", "name"]);
})();