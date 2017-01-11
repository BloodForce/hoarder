declare module "prise" {
	interface IPriseCallback {
		(error: Error, packages: {}[]): void;
	}

	interface IPrise {
		(location: string, packageFragment: string, callback: IPriseCallback): void;
	}

	var prise: IPrise;

	export = prise;
}
