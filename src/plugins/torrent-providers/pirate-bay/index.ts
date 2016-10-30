import { injectable } from 'inversify';
import { PLUGIN_TYPE } from '../../../library/orm';
import { ITorrentProviderPlugin } from './../../../library/plugin/index';

@injectable()
export class PirateBay implements ITorrentProviderPlugin {
	public static TYPE = PLUGIN_TYPE.TORRENT_PROVIDER;
	public static NAME = 'Pirate Bay';

	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('Pirate Bay is looking for torrents');
	}
}
