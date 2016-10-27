import {RssData} from "../../../library/rss-data";

export interface IMatchEngine {
	match(rssData: Array<RssData>): Array<any>;
}

export class DefaultTvShowMatchEngine implements IMatchEngine {
	match(rssData: Array<RssData>) {
		return [{
			id: 1,
			title: 'Breaking Bad',
			year: 2006
		}];
	}
}

export class DefaultMovieMatchEngine implements IMatchEngine {
	match(rssData: Array<RssData>) {
		return null;
	}
}
