import { TYPES } from '../../inversify.types';
import { PLUGIN_TYPE } from '../orm';
import { IMatchEnginePlugin, IPluginConfig, ITorrentProviderPlugin } from '../plugin';
import { inject, injectable } from 'inversify';

@injectable()
export class SeedBox {
    @inject(TYPES.PLUGIN_FACTORY)
    private factory: <T>(config: IPluginConfig) => T;

    public providers: Array<ITorrentProviderPlugin>;
    public matchEngine: IMatchEnginePlugin;

    constructor() {
        this.providers = [];
    }

    createPlugins(config: Array<IPluginConfig>) {
        config.forEach((c) => {
            switch (c.type) {
                case PLUGIN_TYPE.MATCH_ENGINE:
                    this.matchEngine = this.factory<IMatchEnginePlugin>(c);
                    break;
                case PLUGIN_TYPE.TORRENT_PROVIDER:
                    this.providers.push(this.factory<ITorrentProviderPlugin>(c))
                    break;
            }
        });
    }
}