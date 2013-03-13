var assert = require("assert");
var xx = require("../lib/xx");

describe("xx", function () {

	describe("#pass()", function () {
		it("should pass a reference to the next step", function (done) {
			var mutex = xx();

			mutex(function() {
				mutex();

				done();
			});
		});
	});
});
