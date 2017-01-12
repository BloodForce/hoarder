import {Database} from "../orm/database/database";
import {DatabaseContext} from "../orm/database/connection";
import {SeedBoxEntity} from "../orm/entities/seed-box";
import {ConfigEntity} from "../orm/entities/config";
import {SeedBox} from "../seed-box/seed-box";
import {PackageManager} from "../plugin/package-manager";
import {PluginRegistry} from "../plugin/plugin-registry";

export class Hoarder {
	database: Database;
	config: ConfigEntity;
	seedBoxes: Array<SeedBox>;

	constructor() {
		this.database = new Database(new DatabaseContext());
	}

	async init() {
		await this.database.connect();
		this.config = await this.database.config.findOne();

		if (!this.config) {
			let config = this.database.config.create({
				rssPollInterval: 5000,
				torrentClientPollInterval: 2500
			});

			await this.database.config.persist(config);
			this.config = config;
		}
	}

	async initSeedBoxes() {
		let seedBoxes = await this.database.seedbox
			.createQueryBuilder('seedbox')
			.innerJoinAndSelect('seedbox.plugins', 'plugins')
			.getMany();




		// let pluginA = this.database.plugins.create({
		// 	name: 'hoarder-plugin-hd-torrents',
		// 	config: {
		// 		apiKey: 'foo'
		// 	}
		// });
        //
		// seedBoxes[0].plugins.push(pluginA);
		// await this.database.seedbox.persist(seedBoxes);




		this.seedBoxes = seedBoxes.map(seedBox => new SeedBox(new PackageManager(), new PluginRegistry()));
		await this.seedBoxes.reduce((chain, seedBox, index) => chain.then(() => seedBox.init(seedBoxes[index])), Promise.resolve());
	}

	startSchedules() {
		this.seedBoxes.forEach(seedBox => seedBox.start());
	}
}
