var Fiber = require('fibers');

var wait = function(delay, func) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run({name: 'helo'});
        func && func();
    }, delay);
    return Fiber.yield();
};

Fiber(function() {
    var value = wait(2000);
    console.log(value);
}).run();

