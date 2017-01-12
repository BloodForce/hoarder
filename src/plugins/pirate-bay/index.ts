import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry, IPluginRegistryEntry} from "../../../types";

class PirateBay implements ITorrentProviderPlugin {
    constructor(config: IPluginConfig) {
    }

	pollRss() {
		console.log('Pirate Bay is polling the RSS Feed');
		return Promise.resolve();
	}

    findTorrents() {
        console.log('Pirate Bay is looking for torrents');
		return Promise.resolve();
    }
}

export default (PluginRegistry: IPluginRegistry): IPluginRegistryEntry => {
    return PluginRegistry.registerTorrentProvider(PirateBay);
};
