import {ITorrentClientPlugin, IPluginConfig, IPluginRegistry, IPluginRegistryEntry} from "../../../types";

class Transmission implements ITorrentClientPlugin {
	constructor(config: IPluginConfig) {
		console.log(config)
	}

	pollTorrents() {
		console.log('Transmission is polling for torrent statuses');
		return Promise.resolve();
	}

	uploadTorrent() {
		console.log('Uploading torrent to Transmission');
		return Promise.resolve();
	}
}

export default (PluginRegistry: IPluginRegistry): IPluginRegistryEntry => {
	return PluginRegistry.registerTorrentClient(Transmission);
};
