import {PluginRegistry} from "./plugin-registry";
import {PluginValidator} from "./plugin-validator";

export class PluginManager {
	public registry: PluginRegistry;
	public validator: PluginValidator;

	constructor(registry: PluginRegistry, validator: PluginValidator) {
		this.registry = registry;
		this.validator = validator; // TODO: Should probably live in the registry
	}

	init() {
		// Not sure about this. Go through all plugins saved against a seedbox and construct them
	}

	install() {
		// Use npm to install a plugin package

		// npm.load(() => {
		// 	npm.commands.install(['jquery@2.2.3'], function (er: any, data: any) {
		// 		console.log(er, data);
		// 	});
		// });
	}

	updateAll() {
		// Find outdated plugin packages and use npm to update them
	}

	validateAll() {
		// Validate all plugins
	}
}
