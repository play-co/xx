var assert = require("assert");
var xx = require("../lib/xx");

describe("xx", function () {

	describe("#simple()", function () {
		it("no contention", function (done) {
			var mutex = xx.create();

			mutex(function() {
				mutex();

				done();
			});
		});
	});

	describe("#onewaiter()", function () {
		it("two simultaneous accesses", function (done) {
			var mutex = xx.create();
			var ctr = 0;

			mutex(function() {
				if (++ctr !== 1) done(1);

				mutex();
			});

			process.nextTick(function() {
				mutex
			});

			mutex(function() {
				if (++ctr !== 2) done(1);

				mutex();
			});
		});
	});

});
