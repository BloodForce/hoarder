import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class HDTorrents implements ITorrentProviderPlugin {
	constructor(config: IPluginConfig) {
	}

	pollRss() {
		console.log('HDTorrents is polling the RSS Feed')
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	return PluginRegistry.registerTorrentProvider(HDTorrents);
};
