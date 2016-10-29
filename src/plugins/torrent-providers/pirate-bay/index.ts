import { injectable } from 'inversify';
import { ITorrentProviderPlugin } from './../../../library/plugin/index';

@injectable()
export class PirateBay implements ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('Pirate Bay is looking for torrents');
	}
}
