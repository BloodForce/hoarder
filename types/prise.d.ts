type PackageJsonRepository = {
	type: string;
	url: string;
}

type PackageJson = {
	_id: string;
	name: string;
	version: string;
	main: string;
	homepage: string;
	repository: PackageJsonRepository;
}

interface Prise {
	(location: string, packageFragment: string, callback: (error: Error, packages: PackageJson[]) => void): void;
}

declare var prise: Prise;

declare module "prise" {
	export = prise;
}
