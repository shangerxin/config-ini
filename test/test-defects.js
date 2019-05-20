/**
 * Created by Erxin, Shang(Edwin) on 6/21/2016.
 * JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
 * The license is under GPL-3.0
 * Git repo:https://github.com/shangerxin/config-ini
 * Author homepage: http://www.shangerxin.com
 * Version, 1.2.1
 */
var ConfigIniParser = require("../config-ini").ConfigIniParser;
var expect = require("chai").expect;

describe("test-config-ini suite", function(){
    var CRLF = "\r\n";
	var parser;
	
    beforeEach(function(){
        parser = new ConfigIniParser();
	});

	it("Comments should only start from the beginning of a line", function(){
		var iniContent = [
			"; this comment is ignored",
			"scope = global;",
			"",
			"# comment is ignored",
			"[database]",
			"user = db#user",
			"",
			"[paths.default]",
			"datadir = /var/lib/data"
			].join(CRLF);
		parser.parse(iniContent);

		var expectedIniContent = [
			"scope = global;",
			"",
			"[database]",
			"user = db#user",
			"",
			"[paths.default]",
			"datadir = /var/lib/data",
			""
		].join(CRLF).replace(/\s+=\s+/g, "=");

        expect(parser.stringify(CRLF)).to.be.equal(expectedIniContent);
	});

	it("Support array type value, #2", function(){
		var issueIniContent = [
			'[SMS_DC_Countries]',
			'1=[ "1", "2" ]',
			'61=[ "1", "2" ]',
			'44=[ "1", "2", "16" ]',
			'31=[ "16"]',
			'32=[ "16"]',
			'353=[ "1", "2", "16" ]',
			'420=[ "1", "2", "16" ]',
			'421=[ "1", "2", "16" ]'
		].join(CRLF);

		parser.parse(issueIniContent);

		var expectedIniContent = [
			'[SMS_DC_Countries]',
			'1=[ "1", "2" ]',
			'61=[ "1", "2" ]',
			'44=[ "1", "2", "16" ]',
			'31=[ "16"]',
			'32=[ "16"]',
			'353=[ "1", "2", "16" ]',
			'420=[ "1", "2", "16" ]',
			'421=[ "1", "2", "16" ]',
			''
		].join(CRLF).replace(/\s+=\s+/g, "=");
		expect(parser.stringify(CRLF)).to.be.equal(expectedIniContent);
	});

	it("Support add whitspaces into as section name", function(){
		var issueIniContent = [
			'[section name with spaces]',
			'var = 1',
			'[ section_name_with_prefix_space]',
			'var = 1',
			'[section_name(*1%with_suffix_space ]',
			'var = 1',
			'[ section name with prefix and suffix spaces ]',
			'var = 1',
			''
		].join(CRLF);

		parser.parse(issueIniContent);
		var sections = parser.sections();

        expect(sections).to.have.lengthOf(4);
		expect(sections).to.have.members(["section name with spaces",
										 "section_name_with_prefix_space",
										 "section_name(*1%with_suffix_space",
										 "section name with prefix and suffix spaces"]);
	});
});