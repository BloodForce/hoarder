import {PackageManager} from "../plugin/package-manager";
import {PluginRegistry, PluginType} from "../plugin/plugin-registry";
import {SeedBoxEntity} from "../orm/entities/seed-box";
import {PluginFactory} from "../plugin/plugin-factory";
import {IPlugin} from "../../../types/index";

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
		this.plugins.get(PluginType.TorrentProvider).forEach((torrentProvider: any) => {
			setInterval(() => torrentProvider.pollRss(), this.config.scheduleConfig.rssPollInterval);
		});

		this.plugins.get(PluginType.TorrentClient).forEach((torrentClient: any) => {
			setInterval(() => torrentClient.pollTorrents(), this.config.scheduleConfig.torrentClientPollInterval);
		});

		this.plugins.get(PluginType.MediaDatabase).forEach((mediaDatabase: any) => {
			setInterval(() => mediaDatabase.getUpdates(), 10000);
		});
	}
}
