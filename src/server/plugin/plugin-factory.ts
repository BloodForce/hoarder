import {SeedBox} from "../seed-box/seed-box";
import {PluginEntity} from "../orm/entities/plugin";
import {IPluginRegistryEntry, IPlugin} from "../../../types/index";
import {PluginType} from "./plugin-registry";

export class PluginFactory {

	static async createForSeedBox(seedBox: SeedBox): Promise<Map<PluginType, IPlugin[]>> {
		let pluginMap = new Map<PluginType, IPlugin[]>();

		await seedBox.config.plugins.reduce((chain: Promise<any>, pluginConfig: PluginEntity) => {

			return chain
				.then(() => seedBox.packages.findPackageForPlugin(pluginConfig))
				.then((pkg: any) => require(pkg.name).default)
				.then((factoryFn) => factoryFn(seedBox.registry))
				.then((entry: IPluginRegistryEntry) => {
					let plugin = new entry.ctor(<any>pluginConfig.config),
						plugins = pluginMap.get(entry.type);

					if (!plugins) {
						plugins = [plugin];
					} else {
						plugins.push(plugin);
					}

					pluginMap.set(entry.type, plugins);
				});

		}, Promise.resolve());

		return pluginMap;
	}
}
