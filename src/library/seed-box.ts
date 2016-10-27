import {Schedule} from "./schedule";
import {TorrentConductor} from "./conductors";
import {DefaultMovieMatchEngine, DefaultTvShowMatchEngine} from "../plugins/match-engines/default/index";

export class SeedBox {
	private torrentConductor: TorrentConductor;
	public pollRssSchedule: Schedule;

	constructor(config: any) {
		this.torrentConductor = new TorrentConductor(config, [
			new DefaultTvShowMatchEngine(),
			new DefaultMovieMatchEngine()
		]);

		this.pollRssSchedule = new Schedule('every 5 seconds', () =>
			this.torrentConductor.findTorrents().then(() =>
				console.log('Next rss poll happens on:', this.pollRssSchedule.nextScheduleRun)));

		this.pollRssSchedule.start();
	}
}
