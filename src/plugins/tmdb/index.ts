import {IMediaDatabasePlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class Tmdb implements IMediaDatabasePlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	search() {
		console.log('TMDB is searching for a movie/tv show')
	}

	getUpdates() {
		console.log('TMDB is looking for updates')
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	return PluginRegistry.registerMediaDatabase(Tmdb);
};
