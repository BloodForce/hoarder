declare module "npm-check" {
	interface INpmCheck {
		(options: INpmCheckOptions): void;
	}

	interface INpmCheckOptions {
		global?: boolean;
		update?: boolean;
		skipUnused?: boolean;
		ignoreDev?: boolean;
		cwd?: string;
		saveExact?: boolean;
	}

	var npmCheck: INpmCheck;

	export = npmCheck;
}
