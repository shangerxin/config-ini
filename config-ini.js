/**
 * Created by Erxin, Shang(Edwin) on 6/21/2016.
 * JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
 * The license is under GPL-3.0
 * Git repo:https://github.com/shangerxin/config-ini
 * Author homepage: http://www.shangerxin.com
 * Version, 1.0.0
 */

(function (exports) {
    var error = {
        name   : "ConfigIniParser Error",
        message: "Parse config ini file error"
    };

    var errorNoSection = {
        name   : "ConfigIniParser Error",
        message: "The specify section not found"
    };

    var errorNoOption = {
        name   : "ConfigIniParser Error",
        message: "The specify option not found"
    };

    var errorDuplicateSectionError = {
        name   : "ConfigIniParser Error",
        message: "Found duplicated section in the given ini file"
    };

    var errorNoDelimiter = {
        name   : "ConfigIniParser Error",
        message: "The parameter delimiter is required"
    };

    var DEFAULT_SECTION = "__DEFAULT_SECTION__";
    var _sectionRegex   = /\s*\[(\S+)\]\s*/;
    var _optionRegex    = /\s*(\S+)\s*[=:]\s*(.*)\s*/;
    var _commentRegex   = /\s*[#;].*/;
    var _emptyRegex = /\s*/;
    var SECTION_NAME_INDEX = 1;
    var OPTION_NAME_INDEX = 1;
    var OPTION_VALUE_INDEX = 2;
    var NOT_FOUND = -1;

    function _findSection(iniStructure, sectionName) {
        var sections = iniStructure.sections;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if(section.name == sectionName){
                return section;
            }
        }
    }

    function _findSectionIndex(iniStructure, sectionName) {
        var sections = iniStructure.sections;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if(section.name == sectionName){
                return i;
            }
        }

        return NOT_FOUND;
    }

    function _findOption(section, optionName){
        var options = section.options;
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if(option.name == optionName){
                return option;
            }
        }
    }

    function _findOptionIndex(section, optionName){
        var options = section.options;
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if(option.name == optionName){
                return i;
            }
        }

        return NOT_FOUND;
    }

    function _createSection(name){
        return {
            name   : name,
            options: []
        };
    }

    function _createOption(name, value){
        return {
            name:name,
            value:value
        };
    }

    /*
     Create a ini file parser, the format of ini file could be found at
     https://en.wikipedia.org/wiki/INI_file

     Duplicated sections will cause exception, duplicated options will be
     ignored and only the first one will take effect.

     @delimiter, the line delimiter which is used to separate the lines
     @return a ConfigIniParser object
     */
    var ConfigIniParser = function (delimiter) {
        this.delimiter = delimiter;
        if(!delimiter){
            throw errorNoDelimiter;
        }

        /*
         _init object structure
         {
             sections:[
                 {
                     name:string,
                     options:[
                         {
                         name:string,
                         value:value
                         },
                     ]
                 },
             ]
         }
         */
        this._ini = {
            sections: [
            ]
        };

        this._ini.sections.push(_createSection(DEFAULT_SECTION));
    };

    /*
     Create a new section, if the section is already contain in the structure then
      a duplicated section exception will be thrown
     @sectionName, a string
     @return, the created section object
     */
    ConfigIniParser.prototype.addSection = function (sectionName) {
        if(_findSection(this._ini, sectionName)){
            throw errorDuplicateSectionError;
        }
        else{
            var section = _createSection(sectionName);
            this._ini.sections.push(section);
            return this;
        }
    };

    ConfigIniParser.prototype.get = function (sectionName, optionName) {
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        if(section){
            var option = _findOption(section, optionName);
            if(option){
                return option.value;
            }
        }

        throw errorNoOption;
    };

    /*
     Convert the option value to boolean, if the value is a number then return true if it is
     not equal to 0; if the value is string and which value is "true"/"false" then will be converted
     to bool, return true if it is "true"; 
     @return, boolean
     */
    ConfigIniParser.prototype.getBoolean = function (sectionName, optionName) {
        var value = this.get(sectionName? sectionName:DEFAULT_SECTION, optionName);

        if(isNaN(value)){
            return String(value).toLowerCase() == "true";
        }
        else{
            return value != 0;
        }
    };

    ConfigIniParser.prototype.getNumber = function (sectionName, optionName) {
        return +this.get(sectionName? sectionName:DEFAULT_SECTION, optionName);
    };

    ConfigIniParser.prototype.isHaveSection = function (sectionName) {
        return !!_findSection(this._ini, sectionName);
    };

    ConfigIniParser.prototype.isHaveOption = function (sectionName, optionName) {
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        if(section){
            var option = _findOption(section, optionName);
            if(option){
                return true;
            }
        }
        return false;
    };

    ConfigIniParser.prototype.items = function (sectionName) {
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        var items = [];

        for(var i = 0; i < section.options.length; i ++){
            var option = section.options[i];
            items.push([option.name, option.value]);
        }

        return items;
    };

    ConfigIniParser.prototype.options = function(sectionName){
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        if(section){
            var optionNames = [];
            var options = section.options;
            var option;
            for(var i = 0; i < options.length; i ++){
                option = options[i];
                optionNames.push(option.name);
            }
            return optionNames;
        }
        else{
            throw errorNoSection;
        }
    };

    /*
      Remove the specify option from the section if the option exist then remove it
      and return true else return false

      @sectionName, string
      @optionName, string
      @return, boolean
     */
    ConfigIniParser.prototype.removeOption = function (sectionName, optionName) {
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        if(section){
            var optionIndex = _findOptionIndex(section, optionName);
            if(optionIndex != NOT_FOUND){
                section.options.splice(optionIndex, 1);
                return true;
            }
        }

        return false;
    };

    /*
     Remove the specify section if the section exist then remove it
     and return true else return false

     @sectionName, string
     @return, boolean
     */
    ConfigIniParser.prototype.removeSection = function (sectionName) {
        var sectionIndex = _findSectionIndex(this._ini, sectionName);
        if(sectionIndex != NOT_FOUND){
            this._ini.sections.splice(sectionIndex, 1);
            return true;
        }
        else{
            return false;
        }
    };

    ConfigIniParser.prototype.sections = function () {
        var sectionNames = [];
        var sections = this._ini.sections;
        var section;
        for(var i = 0; i < sections.length; i ++){
            section = sections[i];
            if(section.name != DEFAULT_SECTION){
                sectionNames.push(section.name);
            }
        }
        return sectionNames;
    };

    ConfigIniParser.prototype.set = function (sectionName, optionName, value) {
        var section = _findSection(this._ini, sectionName? sectionName:DEFAULT_SECTION);
        var option;
        if(section){
            option = _findOption(section, optionName);
            if(option){
                option.value = value;
                return this;
            }
            else{
                option = _createOption(optionName, value);
                section.options.push(option);
                return this;
            }
        }
        else{
            throw errorNoSection;
        }
    };

    /*
      Convert the configuration content to strings the line will the separate with the
      given line delimiter. A empty line will be added between each section

      @return, the content of configuration 
     */
    ConfigIniParser.prototype.stringify = function () {
        var lines = [];
        var sections = this._ini.sections;
        var currentSection;
        var options;
        var currentOption;
        for(var i = 0; i < sections.length; i ++){
            currentSection = sections[i];
            if(currentSection.name != DEFAULT_SECTION){
                lines.push("[" + currentSection.name + "]");
            }

            options = currentSection.options;
            for(var j = 0; j < options.length; j ++){
                currentOption = options[j];
                lines.push(currentOption.name + "=" + currentOption.value);
            }
            lines.push("");
        }
        return lines.join(this.delimiter);
    };

    ConfigIniParser.prototype.parse = function (iniContent) {
        var lines          = iniContent.split(this.delimiter);
        var currentSection = _findSection(this._ini, DEFAULT_SECTION);

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.match(_commentRegex)) {
                continue;
            }

            var sectionInfo = line.match(_sectionRegex);
            if (sectionInfo) {
                var sectionName = sectionInfo[SECTION_NAME_INDEX];
                if(_findSection(this._ini, sectionName)){
                    throw errorDuplicateSectionError;
                }
                else{
                    currentSection = _createSection(sectionName);
                    this._ini.sections.push(currentSection);
                }
                continue;
            }

            var optionInfo = line.match(_optionRegex);
            if(optionInfo){
                var optionName = optionInfo[OPTION_NAME_INDEX];
                var optionValue = optionInfo[OPTION_VALUE_INDEX];
                var option = _createOption(optionName, optionValue);
                currentSection.options.push(option);
                continue;
            }

            if(line.match(_emptyRegex)){
                continue;
            }

            throw error;
        }
    };

    exports.ConfigIniParser = ConfigIniParser;
}(typeof window != "undefined" ? window : (typeof exports != "undefined" ? exports : {})));