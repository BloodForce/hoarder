import { Plugins } from '../../../library';

@Plugins.registerTorrentProvider()
export class HDTorrents implements Plugins.ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}
