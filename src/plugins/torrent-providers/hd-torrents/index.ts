import { ITorrentProviderPlugin } from './../../../library/plugin/index';

export class HDTorrents implements ITorrentProviderPlugin {
	constructor() {
		console.log('HD TORRENTS NEW')
	}

	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}
