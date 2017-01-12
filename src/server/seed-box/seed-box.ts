import {PackageManager} from "../plugin/package-manager";
import {PluginRegistry} from "../plugin/plugin-registry";
import {SeedBoxEntity} from "../orm/entities/seed-box";
import {PluginFactory} from "../plugin/plugin-factory";

export class SeedBox {
	public config: SeedBoxEntity;
	public packages: PackageManager;
	public registry: PluginRegistry;
	public plugins: any;

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
		// TODO: This should live in the schedule object
		this.plugins.torrentProviders.forEach((torrentProvider: any) => {
			setInterval(() => torrentProvider.pollRss(), this.config.scheduleConfig.rssPollInterval);
		});

		this.plugins.torrentClients.forEach((torrentClient: any) => {
			setInterval(() => torrentClient.pollTorrents(), this.config.scheduleConfig.torrentClientPollInterval);
		});
	}
}
