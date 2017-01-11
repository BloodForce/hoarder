import 'reflect-metadata';
import {PackageManager} from "./plugin/package-manager";
import {PluginRegistry} from "./plugin/plugin-registry";
import {SeedBox} from "./seed-box/seed-box";

const packageManager = new PackageManager();
const registry = new PluginRegistry();
const seedBox = new SeedBox(packageManager, registry);

(async function () {
	await seedBox.init();
	console.log(seedBox.registry);

	const results = await seedBox.packages.search('plex api', {limit: 5});
	console.log(results);
})();
