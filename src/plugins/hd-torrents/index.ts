import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class HDTorrents implements ITorrentProviderPlugin {
	constructor(config: IPluginConfig) {
		console.log('Config -->', config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	return PluginRegistry.registerTorrentProvider(HDTorrents);
};
