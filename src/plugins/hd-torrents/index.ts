import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry, IPluginRegistryEntry} from "../../../types";

class HDTorrents implements ITorrentProviderPlugin {
	constructor(config: IPluginConfig) {
	}

	pollRss() {
		console.log('HDTorrents is polling the RSS Feed');
		return Promise.resolve();
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
		return Promise.resolve();
	}
}

export default (PluginRegistry: IPluginRegistry): IPluginRegistryEntry => {
	return PluginRegistry.registerTorrentProvider(HDTorrents);
};
