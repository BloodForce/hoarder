import {PackageManager} from "../plugin/package-manager";
import {PluginRegistry} from "../plugin/plugin-registry";
import {SeedBoxEntity} from "../orm/entities/seed-box";
import {PluginFactory} from "../plugin/plugin-factory";
import {PluginType} from "../plugin/plugin-type";
import {IPlugin, ITorrentProviderPlugin, ITorrentClientPlugin, IMediaDatabasePlugin} from "../../../types/index";

export class SeedBox {
	public config: SeedBoxEntity;
	public packages: PackageManager;
	public registry: PluginRegistry;
	public plugins: Map<PluginType, IPlugin[]>;

	constructor(packageManager: PackageManager, registry: PluginRegistry) {
		this.packages = packageManager;
		this.registry = registry;
	}

	async init(seedBoxEntity: SeedBoxEntity) {
		this.config = seedBoxEntity;
		await this.packages.findInstalled();
		this.plugins = await PluginFactory.createForSeedBox(this);
	}

	start() {
		// TODO: This should live in the Orchestrator objects
		this.plugins.get(PluginType.TorrentProvider).forEach((torrentProvider: ITorrentProviderPlugin) => {
			setInterval(() => torrentProvider.pollRss(), this.config.scheduleConfig.rssPollInterval);
		});

		this.plugins.get(PluginType.TorrentClient).forEach((torrentClient: ITorrentClientPlugin) => {
			setInterval(() => torrentClient.pollTorrents(), this.config.scheduleConfig.torrentClientPollInterval);
		});

		this.plugins.get(PluginType.MediaDatabase).forEach((mediaDatabase: IMediaDatabasePlugin) => {
			setInterval(() => mediaDatabase.getUpdates(), 10000);
		});
	}
}
