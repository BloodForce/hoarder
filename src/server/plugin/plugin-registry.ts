import {IPluginConstructor} from "../../../types/index";

export class PluginRegistry {
	private matchEngines: {}[];
	private torrentClients: {}[];
	private torrentProviders: {}[];
	private mediaDatabases: {}[];

	constructor() {
		this.matchEngines = [];
		this.torrentClients = [];
		this.torrentProviders = [];
		this.mediaDatabases = [];
	}

	registerMatchEngine(ctor: IPluginConstructor): void {
		this.matchEngines.push(ctor);
	}

	registerTorrentProvider(ctor: IPluginConstructor): void {
		this.torrentClients.push(ctor);
	}

	registerTorrentClient(ctor: IPluginConstructor): void {
		this.torrentProviders.push(ctor);
	}

	registerMediaDatabase(ctor: IPluginConstructor): void {
		this.mediaDatabases.push(ctor);
	}
}
