#MouseMover

instead of running a function everytime a mouse moves this requests the next animation frame and will run a given function with the latest mouse coordinates if there was a move.

For instance:

```javascript

var logMouse = function(coords) {
	console.log('NEW x:' + coords.clientX + ' y:' + coords.clientY);
	console.log('OLD x:' + coords.oldClientX + ' y:' + coords.oldClientY);
};

var mover = new MouseMover(logMouse);
mover.start();

setTimeout(function() {
	mover.stop();
}, 30000);

```