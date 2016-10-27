import {PluginFactory} from '../library/plugin-factory';

class TorrentProvider {
	readRssFeed() : Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('TESTY!!!');
			}, 1500);
		});
	}
}

export class Conductor {
	providers: Array<TorrentProvider>;

	constructor() {
		this.providers = [new TorrentProvider(), new TorrentProvider(), new TorrentProvider(), new TorrentProvider()];
		// this.providers = config.providers.map((provider) => PluginFactory.createPlugin('torrent-provider', provider));
		// this.matcher = {};
		// this.clients = config.clients.map((client) => PluginFactory.createPlugin('torrent-client', client));
		// this.fileTransferer = {};
		// this.renamer = {};
		// this.fileManager = {};
	}

	async pollRss() {
		let data = [];

		for (let provider of this.providers) {
			data.push(await provider.readRssFeed());
		}

		return data;
	}

	// search(query) {
	// 	this.providers.forEach((provider) => {
	// 		return provider.search(query).then((data) => this.match(data, provider));
	// 	});
	// }
	//
	// pollTorrents() {
	// 	this.clients.forEach((torrentClient) => torrentClient.pollTorrents());
	// }
	//
	// match(data, provider) {
	// 	console.log('Finding matches for', provider.name, 'with data', data);
	// }
}
