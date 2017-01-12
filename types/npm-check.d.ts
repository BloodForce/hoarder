type NpmCheckOptions = {
	global?: boolean;
	update?: boolean;
	skipUnused?: boolean;
	ignoreDev?: boolean;
	cwd?: string;
	saveExact?: boolean;
}

type NpmCheckCurrentState = {
	get: (name: string) => NpmCheckState[];
};

type NpmCheckState = {
	moduleName: string,
	homepage: string,
	regError: string,
	pkgError: string,
	latest: string,
	installed: string,
	isInstalled: boolean,
	notInstalled: boolean,
	packageWanted: string,
	packageJson: string,
	devDependency: boolean,
	usedInScripts: boolean,
	mismatch: boolean,
	semverValid: string,
	easyUpgrade: boolean,
	bump: string,
	unused: boolean
};

interface NpmCheck {
	(options: NpmCheckOptions): Promise<NpmCheckCurrentState>;
}

declare var npmCheck: NpmCheck;

declare module "npm-check" {
	export = npmCheck;
}


