import {PackageManager} from "../plugin/package-manager";
import {PluginRegistry} from "../plugin/plugin-registry";

export class SeedBox {
	public packages: PackageManager;
	public registry: PluginRegistry;

	constructor(packageManager: PackageManager, registry: PluginRegistry) {
		this.packages = packageManager;
		this.registry = registry;
	}

	async init() {
		const packages = await this.packages.findInstalled();
		packages.map((pkg: any) => require(pkg.name).default).forEach((factory) => factory(this.registry));
	}
}
