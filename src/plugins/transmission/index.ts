import {ITorrentClientPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class Transmission implements ITorrentClientPlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	uploadTorrent() {
		console.log('Uploading torrent to Transmission')
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	PluginRegistry.registerTorrentClient(Transmission);
};
