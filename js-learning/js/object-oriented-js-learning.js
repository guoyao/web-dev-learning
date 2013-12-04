/**
 * Author: guoyao
 * Time: 11-28-2013 19:44
 * Blog: http://www.guoyao.me
 */

var ajax = (function () {
    function getXHR() {
        var xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            var xhrs = [
                "MSXML2.XMLHTTP.3.0",
                "MSXML2.XMLHTTP",
                "Microsoft.XMLHTTP",
            ];
            for (var i = 0, length = xhrs.length; i < length; i++) {
                try {
                    xhr = new ActiveXObject(xhrs[i]);
                    break;
                }
                catch(e) {

                }
            }
        }
        return xhr;
    }

    function request(url, method, callback, data) {
        var xhr = getXHR();
        if (xhr) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr);
                }
            };
            xhr.open(method, url, true);
            xhr.send(data);
        }
    }

    return {
        request: request
    }
})();

(function () {
    ajax.request("assets/test.xml", "get", function (xhr) {
       console.log(xhr.responseXML.documentElement);
    });
})();

// singleton pattern
function Logger() {
    if (!Logger.single_instance) {
        Logger.single_instance = this;
    }
    return Logger.single_instance;
}
var a = new Logger();
var b = new Logger();
//console.log(a === b); // true

// ---------------------------- decorate pattern ------------------------
var tree = {};
tree.decorate = function () {
    console.log('Make sure the tree won\'t fall');
};
tree.getDecorator = function (deco) {
    tree[deco].prototype = this;
    return new tree[deco];
};
tree.RedBalls = function () {
    this.decorate = function () {
        this.RedBalls.prototype.decorate();
        console.log('Put on some red balls');
    };
};
tree.BlueBalls = function () {
    this.decorate = function () {
        this.BlueBalls.prototype.decorate();
        console.log('Add blue balls');
    };
};
tree.Angel = function () {
    this.decorate = function () {
        this.Angel.prototype.decorate();
        console.log('An angel on the top');
    };
};
tree = tree.getDecorator('BlueBalls');
tree = tree.getDecorator('Angel');
tree = tree.getDecorator('RedBalls');
tree.decorate();

// ------------------- observer pattern -------------------------
var observer = {
    addSubscriber: function (callback) {
        if (typeof callback === "function") {
            this.subscribers[this.subscribers.length] = callback;
        }
    },
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete this.subscribers[i];
            }
        }
    },
    publish: function (what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    make: function (o) { // turns an object into a publisher
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                o[i] = this[i];
                o.subscribers = [];
            }
        }
    }
};
var blogger = {
    writeBlogPost: function() {
        var content = 'Today is ' + new Date();
        this.publish(content);
    }
};
var la_times = {
    newIssue: function() {
        var paper = 'Martians have landed on Earth!';
        this.publish(paper);
    }
};
observer.make(blogger);
observer.make(la_times);
var jack = {
    read: function(what) {
        console.log("I just read that " + what)
    }
};
var jill = {
    gossip: function(what) {
        console.log("You didn't hear it from me, but " + what)
    }
};
blogger.addSubscriber(jack.read);
blogger.addSubscriber(jill.gossip);
blogger.writeBlogPost();
blogger.removeSubscriber(jill.gossip);
blogger.writeBlogPost();
la_times.addSubscriber(jill.gossip);
la_times.newIssue();
