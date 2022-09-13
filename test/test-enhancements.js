/**
 * Created by Erxin, Shang(Edwin) on 6/21/2016.
 * JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
 * The license is under GPL-3.0
 * Git repo:https://github.com/shangerxin/config-ini
 * Author homepage: http://www.shangerxin.com
 * Version, 1.6.1
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

    it("Parse empty value", function(){
        parser.parse("ABC=");
        expect(parser.get(null, "ABC")).to.be.equal("");
    });

    it("Parse invalid option without equal", function(){
        expect(function(){parser.parse("ABC")}).to.throw(ConfigIniParser.Errors.Error);
    });

    it("Mixed different delimiters", function(){
        var initContent =  [
            "[section name with spaces]\r\n",
            "var = 1\r\n",
            "[ section_name_with_prefix_space]\n",
            "var = 2\n",
            "[section_name(*1%with_suffix_space ]\n",
            "var = 3\r\n",
            "[ section name with prefix and suffix spaces ]\r\n",
            "var = true\n",
            "\n",
        ].join("");

        parser.parse(
            initContent
        );

        expect(parser.get("section name with spaces", "var")).to.be.equal("1");
        expect(parser.get("section_name_with_prefix_space", "var")).to.be.equal("2");
        expect(parser.getNumber("section_name(*1%with_suffix_space", "var")).to.be.equal(3);
        expect(parser.getBoolean("section name with prefix and suffix spaces", "var")).to.be.equal(true);
    });
});