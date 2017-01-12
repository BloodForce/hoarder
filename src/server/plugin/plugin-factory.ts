import {SeedBox} from "../seed-box/seed-box";
import {PluginEntity} from "../orm/entities/plugin";
import {
	IPluginRegistryEntry, ITorrentClientPlugin, INotifierPlugin, IMediaDatabasePlugin,
	IMatchEnginePlugin
} from "../../../types/index";
import {ITorrentProviderPlugin} from "../../../build/server/hoarder";
import {PluginType} from "./plugin-registry";

export class PluginFactory {
	static async createForSeedBox(seedBox: SeedBox) {
		let plugins = await seedBox.config.plugins.reduce((chain: Promise<any>, pluginConfig: PluginEntity, index: number, array: any[]) => {
			return chain
				.then(() => seedBox.packages.findPackageForPlugin(pluginConfig))
				.then((pkg: any) => require(pkg.name).default)
				.then((factoryFn) => factoryFn(seedBox.registry))
				.then((entry: IPluginRegistryEntry) => array.push({
					plugin: new entry.ctor(<any>pluginConfig.config),
					type: entry.type
				}))
				.then(() => array)
				.catch(e => console.log(e));
		}, Promise.resolve());

		return plugins.reduce((plugins: any, item: any) => {
			switch (item.type) {
				case PluginType.MatchEngine:
					plugins.matchEngines.push(item.plugin);
					break;
				case PluginType.MediaDatabase:
					plugins.mediaDatabases.push(item.plugin);
					break;
				case PluginType.Notifier:
					plugins.notifiers.push(item.plugin);
					break;
				case PluginType.TorrentClient:
					plugins.torrentClients.push(item.plugin);
					break;
				case PluginType.TorrentProvider:
					plugins.torrentProviders.push(item.plugin);
					break;
			}

			return plugins;
		}, {
			torrentClients: [] as ITorrentClientPlugin[],
			torrentProviders: [] as ITorrentProviderPlugin[],
			notifiers: [] as INotifierPlugin[],
			mediaDatabases: [] as IMediaDatabasePlugin[],
			matchEngines: [] as IMatchEnginePlugin[]
		})
	}
}
