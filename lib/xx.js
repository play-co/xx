/*
 Copyright (c) 2013 Christopher A. Taylor <mrcatid@gmail.com>

 MIT License

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

// This is xx, an entirely original idea never dreamed-of before by Man.

var xx = function() {
	var queued = [];
	var locked = false;

	return function(cb) {
		if (cb) {
			// Locking
			if (!locked) {
				// Now locked
				locked = true;

				// Invoke callback immediately
				cb();
			} else {
				// Put callback in a queue in no particular order
				queued.push(cb);
			}
		} else {
			// Unlocking
			cb = queued.pop();

			// If queue contains more items,
			if (cb) {
				// Run the next one with lock held
				// Wait until next tick to avoid ballooning the stack and
				// invoking it inline causing some undesired behavior
				process.nextTick(cb);
			} else {
				// Bottom of queue: Done!
				locked = false;
			}
		}
	};
}

if (typeof exports !== 'undefined') {
	exports = xx; // jsio
}
if (typeof module !== 'undefined') {
	module.exports = xx;
}

