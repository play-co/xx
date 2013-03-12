# <img src="http://f.cl.ly/items/3K113g321o0n0W0Y0Z33/Fast%20Forward%20Icon%20in%2032x32%20px.png" width=25 height=25> xx: Object Locking for JavaScript

> It's what you need when you need it, but you have to wait in line to get it.

***xx* simplifies the synchronization of data objects between concurrent tasks.**

#### Installation

- Node.JS: `npm install xx`
- Browsers: Add `lib/xx.js` to your HTML page.

## Intro

Here's a brief example that shows how to use `xx`:

```javascript
var xx = require('xx'); // import xx

var config = {}; // Have some data to guard

config.xx = xx(); // Create a lock object

// Acquire lock on the object with an async callback:
config.xx(
	function() {
		// Invoked when the object is available

		// Call without a function when you want to unlock the object:
		config.xx();
	}
);
```

## Usage with Async Libraries

Here's a brief example that shows how it can be used with an async library (such as `ff`):

```javascript
var xx = require('xx'); // import xx
var ff = require('ff'); // Use ff for a demo

var config = {
	fileA: "A.txt",
	fileB: "B.txt"
}; // Have some data to guard

config.xx = xx(); // Create a lock object

var f = ff(this, function () {

	// Added: Wait to acquire lock
	config.xx(f());

}, function () {
    fs.readFile(config.fileA, f());
    fs.readFile(config.fileB, f());
}, function (fileA, fileB) {
    concatFiles(fileA, fileB, f());
}, function (result) {
	config.result = result.toUpperCase();

	// Added: Done with lock here!
	config.xx();

    f();
}).cb(cb);
```

