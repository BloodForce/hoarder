const path = require('path');

export class PluginFactory {
	static createPlugin(type: string, info: any) {
		let Plugin = require(path.resolve(__dirname, '..', 'plugins', type, info.name)).HdTorrents,
			PLUGIN_CONFIG = require(path.resolve(__dirname, '..', 'plugins', type, info.name, 'config'));

		return new Plugin(info.name, PLUGIN_CONFIG);
	}

	static createPlugins(type: string, configurations: Array<any>) {
		return configurations.map((configuration) => this.createPlugin(type, configuration));
	}
}
