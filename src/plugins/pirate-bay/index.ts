import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class PirateBay implements ITorrentProviderPlugin {
    constructor(config: IPluginConfig) {
    }

	pollRss() {
		console.log('Pirate Bay is polling the RSS Feed')
	}

    findTorrents() {
        console.log('Pirate Bay is looking for torrents');
    }
}

export default (PluginRegistry: IPluginRegistry) => {
    return PluginRegistry.registerTorrentProvider(PirateBay);
};
