import 'reflect-metadata';
import {PackageManager} from "./plugin/package-manager";

const packageManager = new PackageManager();

(async function () {
	let packages = await packageManager.findInstalled();
	console.log(packages);

	let outdated = await packageManager.findOutDated();
	console.log(outdated);

	let results = await packageManager.search('lodash');
	console.log(results);
})();
