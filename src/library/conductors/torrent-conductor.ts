import {PluginFactory} from '../../library/plugin-factory';
import {ITorrentProvider} from "../../plugins/torrent-providers/torrent-provider";
import {IMatchEngine} from "../../plugins/match-engines/default/index";

export interface ITorrentConductor {
	findTorrents();
}

export class TorrentConductor implements ITorrentConductor {
	private matchEngines: Array<IMatchEngine>;
	private providers: Array<ITorrentProvider>;

	constructor(config: any, matchEngines: Array<IMatchEngine>) {
		this.matchEngines = matchEngines;
		this.providers = PluginFactory.createPlugins('torrent-providers', config.providers);
	}

	async findTorrents() {
		for (let provider of this.providers) {
			let rssData = await provider.readRssFeed();
			let matches = this.matchEngines.map((matchEngine) => {
				return {
					matchEngine: matchEngine,
					matches: matchEngine.match(rssData)
				}
			});

			if (matches) {
				console.log(provider.name, 'rss feed has the following matches:', matches);
			}
		}
	}
}
