/// <reference types="typescript" />

interface Section {
	name: string;
	options: Array<any>;
}

/*
 * Create a ini file parser, the format of ini file could be found at
 * https://en.wikipedia.org/wiki/INI_file
 *
 * Duplicated sections will cause exception, duplicated options will be
 * ignored and only the first one will take effect.
 *
 * @constructor
 * @param {string} delimiter, the line delimiter which is used to separate the lines
 * @return {ConfigIniParser} a ConfigIniParser object
 */
declare class ConfigIniParser {
	constructor(delimiter?: string);

	/*
	 * Create a new section, if the section is already contain in the structure then
	 * a duplicated section exception will be thrown
	 * @param {string} sectionName a section name defined in ini [section name]
	 * @return {object} the created section object
	 */
	addSection(sectionName: string): Section;

	/*
	 * Get a specific option value
	 * @param {string} sectionName the name defined in ini `[section name]`
	 * @param {string} optionName the name defined in ini `option-name = option-value`
	 * @param {object} defaultValue optional default value to be used when the option does not exist. If it is not provided and the value does not exist, then an exception is thrown.
	 * @return {string/object} the string value of the option or defaultValue
	 */
	get(sectionName: string, optionName: string, defaultValue?: any): any;

	/*
	 * Convert the option value to boolean, if the value is a number then return true if it is
	 * not equal to 0; if the value is string and which value is "true"/"false" then will be converted
	 * to bool, return true if it is "true";
	 * @return {boolean} indicate the value is true or false
	 */
	getBoolean(sectionName: string, optionName: string): boolean;

	/*
	 * Convert a option value to number
	 * @return {number/NaN} number or NaN
	 */
	getNumber(sectionName: string, optionName: string): number;

	/*
	 * Check a specify section is exist or not
	 * @return {boolean} to indicate the result
	 */
	isHaveSection(sectionName: string): boolean;

	/*
	 * Check an option is exist in a section or not.
	 * @return {boolean} boolean
	 */
	isHaveOption(sectionName: string, optionName: string): boolean;

	/*
	 * Get key/value pair of the options in the specify section
	 * @param {string} sectionName a section name defined in ini [section name]
	 * @return {Array.} an array contain several sub arrays which are composed by optionName,
	 * optionValue. The returned array looks like [[optionName0, optionValue0], ...]
	 */
	items(sectionName: string): Array<Array<any>>;

	/*
	 * Get all the option names from the specify section
	 * @param {string} sectionName a section name defined in ini [section name]
	 * @return {Array.} an string array contain all the option names
	 */
	options(sectionName: string): Array<string>;

	/*
	 * Remove the specify option from the section if the option exist then remove it
	 * and return true else return false
	 *
	 * @param {string} sectionName a section name defined in ini [section name]
	 * @param {string} optionName
	 * @return, boolean
	 */
	removeOption(sectionName: string, optionName: string): boolean;

	/*
	 * Remove the specify section if the section exist then remove it
	 * and return true else return false
	 *
	 * @param {string} sectionName
	 * @return {boolean}
	 */
	removeSection(sectionName: string): boolean;

	/*
	 * Get all the section names from the ini content
	 * @return {Array.} an string array
	 */
	sections(): Array<string>;

	/*
	 * Set a option value, if the option is not exist then it will be added to the section.
	 * If the section is not exist an errorNoSection will be thrown
	 * @param {string} sectionName, string
	 * @param {string} optionName, string
	 * @param {string} value, a value should be able to converted to string
	 * @return {object} parser object itself
	 */
	set(
		sectionName: string,
		optionName: string,
		value: string
	): ConfigIniParser;

	/*
	 * Convert the configuration content to strings the line will the separate with the
	 * given line delimiter. A empty line will be added between each section
	 *
	 * @return {string} the content of configuration
	 */
	stringify(delimiter?: string): string;

	/*
	 * Parse a given ini content
	 * @param {string} iniContent, a string normally separated with \r\n or \n
	 * @return {ConfigIniParser} the parser instance itself
	 */
	parse(iniContent: string): ConfigIniParser;
	static readonly Errors: {
		readonly Error: Error;
		readonly ErrorNoSection: Error;
		readonly ErrorNoOption: Error;
		readonly ErrorDuplicateSectionError: Error;
		readonly ErrorCallParseMultipleTimes: Error;
	};
}

declare const _exported: { ConfigIniParser: ConfigIniParser }

export = _exported;
