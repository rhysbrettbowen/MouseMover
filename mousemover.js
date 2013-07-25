// v1.0.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// work derived from https://github.com/twitter/flight/blob/master/lib/advice.js
// ==========================================


define([
	'jquery'
], function() {

	window.requestAnimationFrame = (function(){
	  return  window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.requestAnimFrame ||
          function(callback){
            window.setTimeout(callback, 1000 / 60);
          };
	})();

	var id = 0;

	var getUnique = function() {
		return 'MM' + id++;
	};

	var MouseMover = function(fn) {
		this.fn = fn;
		this.mouseCoords = {};
		this.id = getUnique();
		this.stopped = true;
		this.moved = false;
	};

	MouseMover.prototype.start = function() {
		var that = this;
		$(document.body).on('mousemove.' + this.id, function(e) {
			that.moved = true;
			that.mouseCoords = {
				clientX: e.clientX,
				clientY: e.clientY,
				oldClientX: that.mouseCoords.clientX,
				oldClientY: that.mouseCoords.clientY
			};
		});
		this.stopped = false;
		this.next();
	};

	MouseMover.prototype.stop = function() {
		$(document.body).off('mousemove.' + this.id);
		this.stopped = true;
	};

	MouseMover.prototype.next = function() {
		var that = this;
		window.requestAnimationFrame(function() {
			if (that.stopped)
				return;
			if (that.moved)
				that.fn(that.mouseCoords);
			that.moved = false;
			that.next();
		});
	};

	return MouseMover;
});