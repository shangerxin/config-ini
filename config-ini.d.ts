/// <reference types="typescript" />

declare class ConfigIniParser {
	constructor(delimiter: string);

	addSection(sectionName: string);

	get(sectionName: string, optionName: string, defaultValue: any): any;

	getBoolean(sectionName: string, optionName: string): boolean;

	getNumber(sectionName: string, optionName): number;

	isHaveSection(sectionName: string): boolean;

	isHaveOption(sectionName: string, optionName: string): boolean;

	items(sectionName: string): Array<any>;

	options(sectionName: string): Array<string>;

	removeOption(sectionName: string, optionName: string): boolean;

	removeSection(sectionName: string): boolean;

	sections(): Array<string>;

	set(sectionName: string, optionName: string, value: string): object;

	stringify(delimiter: string): string;

	parse(iniContent: string): object;
}
