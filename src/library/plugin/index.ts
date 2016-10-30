import { TYPES } from '../../inversify.types';
import { inject, injectable } from 'inversify';
import { PLUGIN_TYPE } from '../orm';

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