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

describe("test-config-ini suite", function(){
    var CRLF = "\r\n";
    var iniContent = [
    "; this comment is ignored",
    "scope = global",
    "",
    "[database]",
    "user = dbuser",
    "password = dbpassword",
    "database = use_this_database",
    "",
    "[paths.default]",
    "datadir = /var/lib/data",
    "p0 = first value",
    "p1 = false",
    "p2 = 13.5"
    ].join(CRLF);
    var parser;

    beforeEach(function(){
        parser = new ConfigIniParser();
        parser.parse(iniContent);
    });

    it("parse", function(){
        expect(parser._ini.sections).to.have.lengthOf(3);
        expect(parser._ini.sections[0].options).to.have.lengthOf(1); //default section
        expect(parser._ini.sections[1].options).to.have.lengthOf(3);
        expect(parser._ini.sections[2].options).to.have.lengthOf(4);
    });

    it("stringify", function(){
        var expectIniContent = [
            "scope = global",
            "",
            "[database]",
            "user = dbuser",
            "password = dbpassword",
            "database = use_this_database",
            "",
            "[paths.default]",
            "datadir = /var/lib/data",
            "p0 = first value",
            "p1 = false",
            "p2 = 13.5",
            ""
        ].join(CRLF).replace(/\s+=\s+/g, "=");

        expect(parser.stringify(CRLF)).to.be.equal(expectIniContent);
    });

    it("get", function(){
        expect(parser.get("database", "user")).to.be.equal("dbuser");
        expect(parser.get(null, "scope")).to.be.equal("global");
        expect(parser.get("unexist", "unexist", "default")).to.be.equal("default");
        expect(function(){ parser.get("unexist", "unexist"); }).to.throw();
    });

    it("set", function(){
        parser.set("database", "user", "new-value");
        parser.set("database", "new option", "new-value");
        expect(parser.get("database", "user")).to.be.equal("new-value");
        expect(parser.get("database", "new option")).to.be.equal("new-value");
    });

    it("sections", function(){
        var sections = parser.sections();
        expect(sections).to.have.lengthOf(2);
        expect(sections).to.have.members(["database", "paths.default"]);
    });

    it("isHaveSection", function(){
        expect(parser.isHaveSection("database")).to.be.true;
        expect(parser.isHaveSection("not-exist")).to.be.false;
    });

    it("isHaveOption", function(){
        expect(parser.isHaveOption("paths.default", "p0")).to.be.true;
        expect(parser.isHaveOption("paths.default", "not-exist")).to.be.false;
    });

    it("items", function(){
        expect(parser.items()).to.be.eql([["scope", "global"]]);
        expect(parser.items("database")).to.be.eql([["user", "dbuser"],
                                                    ["password", "dbpassword"],
                                                    ["database", "use_this_database"]]);
    });

    it("options", function(){
        expect(parser.options()).to.have.members(["scope"]);
        expect(parser.options("paths.default")).to.have.members(["datadir", "p0", "p1", "p2"]);
    });

    it("getBoolean", function(){
        expect(parser.getBoolean("paths.default", "p1")).to.be.a("boolean");
        expect(parser.getBoolean("paths.default", "p1")).to.be.false;
        expect(parser.getBoolean("paths.default", "p2")).to.be.true;
    });
    
    it("getNumber", function(){
        expect(parser.getNumber("paths.default", "p2")).to.be.equal(13.5);
        expect(parser.getNumber("paths.default", "p2")).to.be.a("number");
    });

    it("addSection", function(){
        expect(parser.isHaveSection("new section")).to.be.false;
        parser.addSection("new section");
        expect(parser.isHaveSection("new section")).to.be.true;
    });

    it("removeOption", function(){
        expect(parser.isHaveOption("paths.default", "p1")).to.be.true;
        parser.removeOption("paths.default", "p1");
        expect(parser.isHaveOption("paths.default", "p1")).to.be.false;
    });

    it("removeSection", function(){
        expect(parser.isHaveSection("database")).to.be.true;
        parser.removeSection("database");
        expect(parser.isHaveSection("database")).to.be.false;
        expect(function(){parser.get('database', 'user');}).to.throw();
    });
});
