import { TYPES } from '../../inversify.types';
import { inject, injectable } from 'inversify';

export enum PLUGIN_TYPE {
	TORRENT_PROVIDER,
	MATCH_ENGINE
};

export interface IPluginConfig {
    name: string;
    type: PLUGIN_TYPE
}

export interface IPlugin {
    init(config: any);
}

export interface ITorrentProviderPlugin extends IPlugin {
    findTorrents();
}

export interface IMatchEnginePlugin extends IPlugin {
    match();
}