(function ($) {
    function wait(timeout) {
        return $.Deferred(function (deferred) {
            setTimeout(deferred.resolve, timeout);
        }).promise();
    }

//    var promise = wait(1000);
//
//    promise.done(function () {
//        console.log("done");
//    });

    function synchronously(tasks) {
        var i, length, task, func,
            promise = $.Deferred().resolve().promise(),
            makeRunner = function (func, args) {
                return function () {
                    return $.when(func.apply(null, args));
                };
            };

        for (i = 0, length = tasks.length; i < length; i++) {
            task = tasks[i];
            func = task.shift();
            promise = promise.then(makeRunner(func, task));
        }

        return promise;
    }

    function one() {
        var args = arguments,
            promise = wait(2000);
        console.log("one doing...");
        promise.done(function () {
            console.log("one done");
            console.log(args);
        });
        return promise;
    }

    function two() {
        var args = arguments,
            promise = wait(1000);
        console.log("two doing...");
        promise.done(function () {
            console.log("two done");
            console.log(args);
        });
        return promise;
    }

    function three() {
        console.log("three doing...");
        console.log("three done");
    }

    synchronously([
        [one, 1, 2],
        [two, "q", "w"],
        [three]
    ]);
})(jQuery);