/**
 * Created by Erxin, Shang(Edwin) on 6/21/2016.
 * JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
 * The license is under GPL-3.0
 * Git repo:https://github.com/shangerxin/config-ini
 * Author homepage: http://www.shangerxin.com
 * Version, 1.3.0
 */
var ConfigIniParser = require("../config-ini").ConfigIniParser;
var expect = require("chai").expect;

describe("test-config-ini suite", function () {
	var CRLF = "\r\n";
	var parser;

	beforeEach(function () {
		parser = new ConfigIniParser();
	});

	it("Should support call parse multiple time without call clear directly", function () {
		var dummyContent = [
			"[ok]",
			"abc=123"
		].join(CRLF);

		parser.parse(dummyContent);
		expect(function () {
			parser.parse(dummyContent);
		}).to.throw(Error, "Multiple call parse on the same parser instance");
	});
});