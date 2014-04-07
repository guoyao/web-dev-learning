var events = require('events');
var watcher = new events.EventEmitter();
watcher.on('message', function(data) {
    console.log(data);
});
setInterval(function() {
    watcher.emit('message', new Date());
}, 1000);
