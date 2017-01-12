import {IPluginConstructor, IPluginRegistry, IPluginRegistryEntry} from "../../../types/index";

export enum PluginType {
	MatchEngine,
	TorrentProvider,
	TorrentClient,
	MediaDatabase,
	Notifier
}

export class PluginRegistry implements IPluginRegistry {
	matchEngines: Array<IPluginConstructor>;
	torrentClients: Array<IPluginConstructor>;
	torrentProviders: Array<IPluginConstructor>;
	mediaDatabases: Array<IPluginConstructor>;
	notifiers: Array<IPluginConstructor>;

	constructor() {
		this.matchEngines = [];
		this.torrentClients = [];
		this.torrentProviders = [];
		this.mediaDatabases = [];
		this.notifiers = [];
	}

	registerMatchEngine(ctor: IPluginConstructor): IPluginRegistryEntry {
		this.matchEngines.push(ctor);

		return {
			type: PluginType.MatchEngine,
			ctor
		};
	}

	registerTorrentProvider(ctor: IPluginConstructor): IPluginRegistryEntry {
		this.torrentClients.push(ctor);

		return {
			type: PluginType.TorrentProvider,
			ctor
		};
	}

	registerTorrentClient(ctor: IPluginConstructor): IPluginRegistryEntry {
		this.torrentProviders.push(ctor);

		return {
			type: PluginType.TorrentClient,
			ctor
		};
	}

	registerMediaDatabase(ctor: IPluginConstructor): IPluginRegistryEntry {
		this.mediaDatabases.push(ctor);

		return {
			type: PluginType.MediaDatabase,
			ctor
		};
	}

	registerNotifier(ctor: IPluginConstructor): IPluginRegistryEntry {
		this.notifiers.push(ctor);

		return {
			type: PluginType.Notifier,
			ctor
		};
	}
}
