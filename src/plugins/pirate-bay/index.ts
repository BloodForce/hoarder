import {ITorrentProviderPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class PirateBay implements ITorrentProviderPlugin {
    constructor(config: IPluginConfig) {
        console.log(config)
    }

    findTorrents() {
        console.log('Pirate Bay is looking for torrents');
    }
}

export default (PluginRegistry: IPluginRegistry) => {
    PluginRegistry.registerTorrentProvider(PirateBay);
};
