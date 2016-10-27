import {RssData} from '../../../library';
import {ITorrentProvider} from "../torrent-provider";

export class HdTorrents implements ITorrentProvider {
	name: string;
	config: any;

	constructor(name: string, config: any) {
		this.name = name;
		this.config = config;
	}

	readRssFeed(): Promise<Array<RssData>> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([new RssData('Breaking Bad', 'http://foo.com/354t4w5h45tetge5t.torrent')]);
			}, 1500);
		});
	}
}
