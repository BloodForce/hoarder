import {resolve} from "path";
import * as npmSearch from 'npm-module-search';
import {INpmSearchOptions} from "npm-module-search";
import * as npmCheck from 'npm-check';
import * as prise from 'prise';
import {PluginEntity} from "../orm/entities/plugin";

export class PackageManager {
	private rootInstallLocation: string;
	private installLocation: string;

	constructor() {
		this.rootInstallLocation = resolve(__dirname, '../');
		this.installLocation = resolve(this.rootInstallLocation, 'node_modules');
	}

	async findPackageForPlugin(pluginConfig: PluginEntity) {
		let plugins = await this.findInstalled();

		let installedPlugin = plugins.find(plugin => plugin.name === pluginConfig.name);

		return installedPlugin ? Promise.resolve(installedPlugin) : Promise.reject(pluginConfig);
	}

	findInstalled(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			prise(this.installLocation, 'hoarder-plugin-', function (error: Error, packages: {}[]) {
				if (error) {
					return reject(error);
				}

				resolve(packages);
			});
		});
	}

	findOutDated(): Promise<{}[]> {
		return this.findInstalled()
			.then(() => npmCheck({
				cwd: this.rootInstallLocation
			}))
			.then((currentState: any) => currentState.get('packages'))
			.then((packages: string[]) => packages.filter((module: any) => module.moduleName.indexOf('hoarder-plugin-') > -1));
	}

	search(packageName: string, options?: INpmSearchOptions): Promise<Array<Object>> {
		return new Promise((resolve, reject) => {
			npmSearch.search(packageName, options, (error: Error, packages: Array<Object>) => {
				if (error) {
					return reject(error);
				}

				resolve(packages);
			});
		});
	}
}
