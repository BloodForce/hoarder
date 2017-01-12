import {IMatchEnginePlugin, IPluginConfig, IPluginRegistry, IPluginRegistryEntry} from "../../../types";

class MovieMatchEngine implements IMatchEnginePlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	match() {
		console.log('Default match engine running...');
		return Promise.resolve();
	}
}

export default (PluginRegistry: IPluginRegistry): IPluginRegistryEntry => {
	return PluginRegistry.registerMatchEngine(MovieMatchEngine);
};
