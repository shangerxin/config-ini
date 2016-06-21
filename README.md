# config-ini
- description
JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations
- created by Erxin,Shang(Edwin)
Git repo:https://github.com/shangerxin/config-ini
Author homepage: http://www.shangerxin.com
Version, 1.0.0

# install 
$ npm install config-ini-parser

or 

$ bower install config-ini 

# simple ini file content, there is no option supplied for the option a default section will be used,for more detail please check https://en.wikipedia.org/wiki/INI_file
optionName0=value0
optionName2=value2

[sectionName0]
optionName0=value0
optionName1=value1
...
[sectionName1]
optionName0=value0
optionName1=value1
optoinName2=value2
...

# use
- in node
```
var ConfigIniParser = require("config-ini").ConfigIniParser;
var delimiter = "\r\n"; //or "\n" for *nux

parser = new ConfigIniParser(delimiter);
parser.parse(iniContent);
var value = parser.get("section", "option");
```

- in browser, add config-ini.js to html by script tag
```
var delimiter = "\r\n"; //or "\n" for *nux

parser = new ConfigIniParser(delimiter);
parser.parse(iniContent);
var value = parser.get("section", "option");
```

# APIs 
```
//return parser itself
.addSection(sectionName); 
 
//return the option value 
.get(sectionName, optionName) ; 

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

//remove a specify option from the section if it exist and succeful removed then return true, if not exist then return false
.removeOption(sectionName, optionName); 

//remove a specify section if it exist and succeful removed then return true, if not exist then return false
.removeSection(sectionName); 

//return all the section names into an array 
.sections(); 

//set the value of the option in a given section, if the option is not exist then it will be added, if the section is not exist then exception will be raise 
.set(sectionName, optionName, value); 

//convert back the configuration content into delimiter separated string
.stringify();

//parse a ini content 
.parse(iniContent); 
```

# license
GPL-3.0