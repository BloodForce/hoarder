import { injectable } from 'inversify';
import { ITorrentProviderPlugin } from './../../../library/plugin/index';

@injectable()
export class HDTorrents implements ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}
