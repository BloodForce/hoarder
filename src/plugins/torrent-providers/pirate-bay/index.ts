import { Service } from 'typedi';
import { ITorrentProviderPlugin } from './../../../library/plugin/index';

@Service('PR')
export class PirateBay implements ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('Pirate Bay is looking for torrents');
	}
}
