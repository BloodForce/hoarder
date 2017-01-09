export interface IPluginConfig {
	name: string;
	type: symbol;
}

export interface IPluginConstructor {
	new (config: IPluginConfig): {};
}

export interface IPlugin {
}

export interface ITorrentProviderPlugin extends IPlugin {
	findTorrents(): void;
}

export interface ITorrentClientPlugin extends IPlugin {
}

export interface IMatchEnginePlugin extends IPlugin {
}

export interface IMediaDatabasePlugin extends IPlugin {
}

export interface IPluginRegistry {
	registerMatchEngine(ctor: IPluginConstructor): void;
	registerTorrentProvider(ctor: IPluginConstructor): void;
	registerTorrentClient(ctor: IPluginConstructor): void;
	registerMediaDatabase(ctor: IPluginConstructor): void;
}
