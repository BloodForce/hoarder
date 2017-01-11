declare module "npm-module-search" {
	interface INpmSearchCallback {
		(error: Error, packages: Array<Object>): void;
	}

	interface INpmSearchOptions {
		limit: number;
	}

	export function search (packageName: string, options: INpmSearchOptions, callback: INpmSearchCallback): void;
	export function search (packageName: string, callback: INpmSearchCallback): void;
}
