type NpmSearchModuleOptions = {
	limit: number;
}

type NpmSearchModuleResult = {
	name: string,
	version: string;
	author: string
	description: string
	stars: number
};

declare module "npm-module-search" {
	export function search(packageName: string, callback: (error: Error, packages: Array<NpmSearchModuleResult>) => void): void;
	export function search(packageName: string, options: NpmSearchModuleOptions, callback: (error: Error, packages: Array<NpmSearchModuleResult>) => void): void;
}
