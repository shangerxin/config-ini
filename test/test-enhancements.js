/**
 * Created by Erxin, Shang(Edwin) on 6/21/2016.
 * JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
 * The license is under GPL-3.0
 * Git repo:https://github.com/shangerxin/config-ini
 * Author homepage: http://www.shangerxin.com
 * Version, 1.5.1
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

	it("Should support omit the default section name when access the default section", function () {
        var dummyContent = [
            "abc=123",
            "isBool=1",
            "[a section]",
            "abc=456",
        ].join(CRLF);

        parser.parse(dummyContent);
        expect(parser.getOptionFromDefaultSection("abc")).to.be.equal("123");
        expect(parser.getNumberFromDefaultSection("abc") === 123).to.be.true;
        expect(parser.getBooleanFromDefaultSection("abc") === true).to.be.true;
        expect(
            parser.getOptionFromDefaultSection("not-exist-option", 456)
        ).to.be.equal(456);

        parser.setOptionInDefaultSection("new-added", 1233);
        expect(parser.get(null, "new-added")).to.be.equal(1233);
    });
});