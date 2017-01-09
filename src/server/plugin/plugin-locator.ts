import * as path from 'path';
import Finder = require('fs-finder');
import {PluginValidator} from "./plugin-validator";

export class PluginLocator {
	private pluginValidator: PluginValidator;
	private pluginLocation: string;
	private plugins: Array<any>;

	constructor(pluginValidator: PluginValidator) {
		this.pluginValidator = pluginValidator;
		this.pluginLocation = path.resolve(__dirname, '../../..', 'src/plugins');
	}

	findAndInject(): Promise<Array<any>> {
		return new Promise((resolve) => {
			Finder.from(this.pluginLocation).findFiles('package.json', (pluginRootFiles: string[]) => {
				this.plugins = pluginRootFiles
					.map((pluginRootFile) => {
						let pluginExport = require(pluginRootFile),
							pluginKeys = Object.keys(pluginExport);

						return pluginExport[pluginKeys[0]];
					});

				resolve(this.plugins);
			});
		});
	}

	getInstalled(names: Array<string>): any {
		return this.plugins
			.filter((plugin) => names.indexOf(plugin.NAME) > -1)
			.reduce((obj, plugin) => {
				let key: string;

				// switch (plugin.TYPE) {
				// 	case TYPES.TORRENT_PROVIDER:
				// 		key = 'providers';
				// 		break;
				// 	case TYPES.TORRENT_CLIENT:
				// 		key = 'clients';
				// 		break;
				// 	case TYPES.MEDIA_DATABASE:
				// 		key = 'databases';
				// 		break;
				// 	case TYPES.MATCH_ENGINE:
				// 		key = 'engines';
				// 		break;
				// }

				// obj[key] = obj[key] || [];
				// obj[key].push(container.getNamed<any>(plugin.TYPE, plugin.NAME));

				return obj;
			}, {});
	}
}
