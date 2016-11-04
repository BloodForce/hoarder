import { Plugins } from './../../../library';

@Plugins.registerTorrentProvider()
export class PirateBay implements Plugins.ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('Pirate Bay is looking for torrents');
	}
}
