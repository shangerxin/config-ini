# Introduction for config-ini [![Build Status](https://travis-ci.com/shangerxin/config-ini.svg?branch=master)](https://travis-ci.com/shangerxin/config-ini) [![Coverage Status](https://coveralls.io/repos/github/shangerxin/config-ini/badge.svg?branch=master)](https://coveralls.io/github/shangerxin/config-ini?branch=master) 

-   ***Description***
    JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations. Only one JavaScript file without any other dependencies. Compatible with NodeJS, TypeScript and Browsers.

-   ***Author*** Erxin(Edwin) Shang
    -   Git repo:[https://github.com/shangerxin/config-ini](https://github.com/shangerxin/config-ini)
    -   Author homepage: [ http://www.shangerxin.com](http://www.shangerxin.com)
    -   Version, 1.5.9

# Install

\$ npm install config-ini-parser

or

\$ bower install config-ini

# Simple example ini content

-   If there is no section supplied for the options then a default section will be created

```ini
optionName0=value0
optionName2=value2

[sectionName0]
optionName0=value0
optionName1=value1
...
[sectionName1]
optionName0=value0
optionName1=value1
optionName2=value2
...
```

-   More about ini format could be found at [https://en.wikipedia.org/wiki/INI_file](https://en.wikipedia.org/wiki/INI_file)

# Use cases

-   For node

```js
var ConfigIniParser = require("config-ini-parser").ConfigIniParser;
var delimiter = "\r\n"; //or "\n" for *nux

parser = new ConfigIniParser(delimiter); //If don't assign the parameter delimiter then the default value \n will be used
parser.parse(iniContent);
var value = parser.get("section", "option");
value = parser.get(null, "option"); //access the default section
value = parser.getOptionFromDefaultSection("option"); //access the default section
parser.stringify('\n'); //get all the ini file content as a string
```

-   For browser, add config-ini.js to html pages

```js
var delimiter = "\r\n"; //or "\n" for *nux. by default it will use \n

parser = new ConfigIniParser(delimiter); //If don't assign the parameter delimiter then the default value \n will be used
parser.parse(iniContent);
var value = parser.get("section", "option");
value = parser.get(null, "option"); //access the default section
value = parser.getOptionFromDefaultSection("option"); //access the default section
```

-   Reference the config-ini.d.ts file in a typescript file

```ts
///<reference path="..\\node_modules\\config-ini-parser\\config-ini.d.ts"/>

const ConfigIniParser = require("config-ini-parser").ConfigIniParser;
//or with import statements
//import { ConfigIniParser } from "config-ini-parser";

let p = new ConfigIniParser();
try {
    p.addSection("abc");
} catch (e) {
    if (e == ConfigIniParser.Errors.ErrorDuplicateSectionError) {
        console.error("Duplicated section");
    }
}
```

# APIs

```js
//create a new config ini parser instance, if the delimiter is ignore then '\n' will be used
ConfigIniParser([delimiter]);

//return parser itself
.addSection(sectionName);

//return the option value
.get(sectionName, optionName[, defaultValue]) ;

//return the option value from default section
.getOptionFromDefaultSection(optionName[, defaultValue]);

//return option value and convert to boolean
.getBoolean(sectionName, optionName);

//return option value and convert to boolean from the default section
.getBooleanFromDefaultSection(optionName);

//return option value and converted to number
.getNumber(sectionName, optionName);

//return value and converted to number from default section
.getNumberFromDefaultSection(optionName);

//return boolean
.isHaveSection(sectionName);

//return boolean
.isHaveOption(sectionName, optionName);

//return boolean
.isHaveOptionInDefaultSection(optionName);

//return all the items in the specify section as [[optionName, optionValue]]
.items(sectionName);

//return all the option names under a specify section into an array
.options(sectionName);

//parse a ini content
.parse(iniContent);

//remove a specify option from the section if it exist and successful removed then return true, if not exist then return false
.removeOption(sectionName, optionName);

//remove a specify option from the default section if it exist and successful removed then return true, if not exist then return false
.removeOptionFromDefaultSection(optionName);

//remove a specify section if it exist and successful removed then return true, if not exist then return false
.removeSection(sectionName);

//return all the section names into an array
.sections();

//set the value of the option in a given section, if the option is not exist then it will be added, if the section is not exist then exception will be raise
.set(sectionName, optionName, value);

//set the option to the given value in the default section. if the option is not exit then it will be added.
.setOptionInDefaultSection(optionName, value);

//convert back the configuration content into delimiter separated string, if delimiter is
//ignore then '\n' will be used
.stringify([delimiter]);
```

# Error types
Defined several kinds of built-in error types
```js
ConfigIniParser.Errors.Error;
ConfigIniParser.Errors.ErrorNoSection;
ConfigIniParser.Errors.ErrorNoOption;
ConfigIniParser.Errors.ErrorDuplicateSectionError;
ConfigIniParser.Errors.ErrorCallParseMultipleTimes;
ConfigIniParser.Errors.ErrorIncorrectArgumentType;
```

# license

GPL-3.0
