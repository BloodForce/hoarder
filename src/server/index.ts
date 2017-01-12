import 'reflect-metadata';
import {Hoarder} from "./app/hoarder";

(async function () {
	let hoarder = new Hoarder();

	await hoarder.init();
	await hoarder.initSeedBoxes();

	hoarder.startSchedules();
})();
