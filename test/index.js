var assert = require("assert");
var xx = require("../lib/xx");

describe("xx", function () {

	describe("#simple()", function () {
		it("no contention", function (done) {
			var mutex = xx();

			mutex(function() {
				mutex();

				done();
			});
		});
	});

	describe("#onewaiter()", function () {
		it("two simultaneous accesses", function (done) {
			var mutex = xx();
			var ctr = 0;

			// Acquire 1
			mutex(function() {
				assert(++ctr === 1);
			});

			process.nextTick(function() {
				assert(++ctr === 2);

				// Release 1
				mutex();

				assert(ctr === 2);
			});

			// Acquire 2
			mutex(function() {
				assert(++ctr === 3);

				// Release 2
				mutex();

				assert(ctr === 3);

				done();
			});
		});
	});


	describe("#twowaiters()", function () {
		it("three simultaneous accesses", function (done) {
			var mutex = xx();
			var ctr = 0;

			// Acquire 1
			mutex(function() {
				assert(++ctr === 1);
			});

			process.nextTick(function() {
				assert(++ctr === 2);

				// Release 1
				mutex();

				assert(ctr === 2);
			});

			// Acquire 2
			mutex(function() {
				assert(++ctr === 4);

				// Release 2
				mutex();

				assert(ctr === 4);

				done();
			});

			// Acquire 3
			mutex(function() {
				assert(++ctr === 3);

				// Release 3
				mutex();

				assert(ctr === 3);
			});
		});
	});
});
