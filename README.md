# Introduction for config-ini

-   description
    JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations

-   created by Erxin,Shang(Edwin)
    -   Git repo:[https://github.com/shangerxin/config-ini](https://github.com/shangerxin/config-ini)
    -   Author homepage: [ http://www.shangerxin.com](http://www.shangerxin.com)
    -   Version, 1.3.0

# Install

\$ npm install config-ini-parser

or

\$ bower install config-ini

# Simple example ini content

-   If there is no section supplied for the options then a default section will be used

```
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

```
var ConfigIniParser = require("config-ini-parser").ConfigIniParser;
var delimiter = "\r\n"; //or "\n" for *nux

parser = new ConfigIniParser(delimiter); //If don't assign the parameter delimiter then the default value \n will be used
parser.parse(iniContent);
var value = parser.get("section", "option");
parser.stringify('\n'); //get all the ini file content as a string
```

-   For browser, add config-ini.js to html by script tag

```
var delimiter = "\r\n"; //or "\n" for *nux. by default it will use \n

parser = new ConfigIniParser(delimiter); //If don't assign the parameter delimiter then the default value \n will be used
parser.parse(iniContent);
var value = parser.get("section", "option");
```

# APIs

```
//create a new config ini parser instance, if the delimiter is ignore then '\n' will be used
ConfigIniParser([delimiter]);

//return parser itself
.addSection(sectionName);

//return the option value
.get(sectionName, optionName, [defaultValue]) ;

//return boolean
.getBoolean(sectionName, optionName);

//return value and converted to number
.getNumber(sectionName, optionName);

//return boolean
.isHaveSection(sectionName);

//return boolean
.isHaveOption(sectionName, optionName);

//return all the items in the specify section as [[optionName, optionValue]]
.items(sectionName);

//return all the option names under a specify section into an array
.options(sectionName);

//remove a specify option from the section if it exist and successful removed then return true, if not exist then return false
.removeOption(sectionName, optionName);

//remove a specify section if it exist and successful removed then return true, if not exist then return false
.removeSection(sectionName);

//return all the section names into an array
.sections();

//set the value of the option in a given section, if the option is not exist then it will be added, if the section is not exist then exception will be raise
.set(sectionName, optionName, value);

//convert back the configuration content into delimiter separated string, if delimiter is
//ignore then '\n' will be used
.stringify([delimiter]);

//parse a ini content
.parse(iniContent);
```

# license

GPL-3.0
