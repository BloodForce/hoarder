import {IMediaDatabasePlugin, IPluginConfig, IPluginRegistry, IPluginRegistryEntry} from "../../../types";

class Tmdb implements IMediaDatabasePlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	search() {
		console.log('TMDB is searching for a movie/tv show');
		return Promise.resolve();
	}

	getUpdates() {
		console.log('TMDB is looking for updates');
		return Promise.resolve();
	}
}

export default (PluginRegistry: IPluginRegistry): IPluginRegistryEntry => {
	return PluginRegistry.registerMediaDatabase(Tmdb);
};
