import {RssData} from "../../library/rss-data";

export interface ITorrentProvider {
	name: string;
	config: any;
	readRssFeed(): Promise<Array<RssData>>;
}
