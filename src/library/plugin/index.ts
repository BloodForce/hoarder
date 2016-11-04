import * as console from 'console';
import { TYPES } from '../../inversify.types';
import { kernel } from '../../inversify.config';
import { inject, injectable, decorate } from 'inversify';

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

export interface IPluginStatic extends IPlugin {
    NAME: string;
    TYPE: Symbol
}

export interface ITorrentProviderPlugin extends IPlugin {
    findTorrents();
}

export interface ITorrentClient extends IPlugin {
    uploadTorrent();
}

export interface IMatchEnginePlugin extends IPlugin {
    match();
}

export interface IMediaDatabasePlugin extends IPlugin {
    search();
}

function register(TYPE: symbol) {
    return function (target: any) {
        target.TYPE = TYPE;
        target.NAME = target.prototype.constructor.name;
        decorate(injectable(), target);        
        kernel.bind(TYPE).to(target).whenTargetNamed(target.NAME);
        return target;
    }
}

export function registerMatchEngine() {
    return register(TYPES.MATCH_ENGINE);
};

export function registerTorrentProvider() {
    return register(TYPES.TORRENT_PROVIDER);
};

export function registerTorrentClient() {
    return register(TYPES.TORRENT_CLIENT);
};

export function registerMediaDatabase() {
    return register(TYPES.MEDIA_DATABASE);
}