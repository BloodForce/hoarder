import { PLUGIN_TYPE } from '../../../library/orm';
import { ITorrentProviderPlugin } from '../../../library/plugin';
import { injectable } from 'inversify';

@injectable()
export class HDTorrents implements ITorrentProviderPlugin {
	public static TYPE = PLUGIN_TYPE.TORRENT_PROVIDER;
	public static NAME = 'HD Torrents';

	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}
