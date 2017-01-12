export interface IPluginConfig {
	name: string;
	type: symbol;
}

export interface IPluginConstructor {
	new (config: IPluginConfig): IPlugin;
}

export interface IPlugin {
	// config: IPluginConfig;
}

export interface ITorrentProviderPlugin extends IPlugin {
	pollRss(): Promise<any>;
	findTorrents(): Promise<any>;
}

export interface ITorrentClientPlugin extends IPlugin {
	pollTorrents(): Promise<any>;
}

export interface IMatchEnginePlugin extends IPlugin {
}

export interface IMediaDatabasePlugin extends IPlugin {
	getUpdates(): Promise<any>;
}

export interface INotifierPlugin extends IPlugin {
	send(): Promise<any>;
}

export interface IPluginRegistryEntry {
	type: number,
	ctor: IPluginConstructor
}

export interface IPluginRegistry {
	registerMatchEngine(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerTorrentProvider(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerTorrentClient(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerMediaDatabase(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerNotifier(ctor: IPluginConstructor): IPluginRegistryEntry;
}
