import {IMatchEnginePlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class MovieMatchEngine implements IMatchEnginePlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	match() {
		console.log('Default match engine running...')
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	PluginRegistry.registerMatchEngine(MovieMatchEngine);
};
