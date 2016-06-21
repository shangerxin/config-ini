# config-ini
JavaScript Configuration file(.ini) content parser, similar to python ConfigParser without I/O operations

# install 
$ npm install config-ini-parser

or 

$ bower install config-ini 

# use
- in node
```
var ConfigIniParser = require("config-ini").ConfigIniParser;
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