declare module "npm-module-search" {
	interface INpmSearchCallback {
		(error: Error, packages: Array<Object>): void;
	}
	interface INpmSearchOtions {
		limit: number;
	}
	interface INpmSearch {
		search(packageName: string, callback: INpmSearchCallback): void;
		search(packageName: string, limit: INpmSearchOtions, callback: INpmSearchCallback): void;
	}

	var npmSearch: INpmSearch;
	export = npmSearch;
}
