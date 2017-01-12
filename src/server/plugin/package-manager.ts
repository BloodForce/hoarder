import {resolve} from "path";
import * as prise from 'prise';
import * as npmSearch from 'npm-module-search';
import * as npmCheck from 'npm-check';
import {PluginEntity} from "../orm/entities/plugin";

export class PackageManager {
	private rootInstallLocation: string;
	private installLocation: string;

	constructor() {
		this.rootInstallLocation = resolve(__dirname, '../');
		this.installLocation = resolve(this.rootInstallLocation, 'node_modules');
	}

	async findPackageForPlugin(pluginConfig: PluginEntity): Promise<PackageJson> {
		let plugins = await this.findInstalled();

		let installedPlugin = plugins.find(plugin => plugin.name === pluginConfig.name);

		return installedPlugin ? Promise.resolve(installedPlugin) : Promise.reject(pluginConfig);
	}

	findInstalled(): Promise<PackageJson[]> {
		return new Promise((resolve, reject) => {
			prise(this.installLocation, 'hoarder-plugin-', function (error: Error, packages: PackageJson[]) {
				if (error) {
					return reject(error);
				}

				resolve(packages);
			});
		});
	}

	findOutDated(): Promise<string[]> {
		return this.findInstalled()
			.then(() => npmCheck({
				cwd: this.rootInstallLocation
			}))
			.then((currentState: NpmCheckCurrentState) => currentState.get('packages'))
			.then((packages: NpmCheckState[]) => packages.filter((module: NpmCheckState) => module.moduleName.indexOf('hoarder-plugin-') > -1));
	}

	search(packageName: string, options?: NpmSearchModuleOptions): Promise<Array<NpmSearchModuleResult>> {
		return new Promise((resolve, reject) => {
			npmSearch.search(packageName, options, (error: Error, packages: Array<NpmSearchModuleResult>) => {
				if (error) {
					return reject(error);
				}

				resolve(packages);
			});
		});
	}
}
