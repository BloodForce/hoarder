import {IMediaDatabasePlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class Tmdb implements IMediaDatabasePlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	search() {
		console.log('Searching for movie/tv show using TMDB')
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	PluginRegistry.registerMediaDatabase(Tmdb);
};
