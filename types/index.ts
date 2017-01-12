import {PluginType} from "../src/server/plugin/plugin-registry";

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
	findTorrents(): void;
}

export interface ITorrentClientPlugin extends IPlugin {
}

export interface IMatchEnginePlugin extends IPlugin {
}

export interface IMediaDatabasePlugin extends IPlugin {
}

export interface INotifierPlugin extends IPlugin {
	send(): Promise<any>;
}

export interface IPluginRegistryEntry {
	type: PluginType,
	ctor: IPluginConstructor
}

export interface IPluginRegistry {
	registerMatchEngine(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerTorrentProvider(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerTorrentClient(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerMediaDatabase(ctor: IPluginConstructor): IPluginRegistryEntry;
	registerNotifier(ctor: IPluginConstructor): IPluginRegistryEntry;
}
