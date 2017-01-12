import {ITorrentClientPlugin, IPluginConfig, IPluginRegistry} from "../../../types";

class Transmission implements ITorrentClientPlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	pollTorrents() {
		console.log('Transmission is polling for torrent statuses')
	}

	uploadTorrent() {
		console.log('Uploading torrent to Transmission')
	}
}

export default (PluginRegistry: IPluginRegistry) => {
	return PluginRegistry.registerTorrentClient(Transmission);
};
