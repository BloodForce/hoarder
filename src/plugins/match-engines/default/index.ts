import { PLUGIN_TYPE } from '../../../library/orm';
import { IMatchEnginePlugin } from './../../../library/plugin/index';
import { injectable } from 'inversify';

@injectable()
export class DefaultMatchEngine implements IMatchEnginePlugin {
	public static TYPE = PLUGIN_TYPE.MATCH_ENGINE;
	public static NAME = 'Default Match Engine';

	init(config: any) {
		console.log(config)
	}

	match() {
		console.log('Default match engine running...')
	}
}

// import {RssData} from "../../../library/rss-data";
//
// export interface IMatchEngine {
// 	match(rssData: Array<RssData>): Array<any>;
// }
//
// export class DefaultTvShowMatchEngine implements IMatchEngine {
// 	match(rssData: Array<RssData>) {
// 		return [{
// 			id: 1,
// 			title: 'Breaking Bad',
// 			year: 2006
// 		}];
// 	}
// }
//
// export class DefaultMovieMatchEngine implements IMatchEngine {
// 	match(rssData: Array<RssData>) {
// 		return null;
// 	}
// }
