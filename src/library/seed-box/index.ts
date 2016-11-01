import { Plugins } from '../';
import { TYPES } from '../../inversify.types';
import { inject, injectable } from 'inversify';

export interface ISeedBox {
    plugins: Array<Plugins.IPlugin>;
    createPlugins(config: Array<Plugins.IPluginConfig>) : void;
}

@injectable()
export class SeedBox implements ISeedBox {
    @inject(TYPES.PLUGIN_FACTORY)
    private factory: <T>(config: Plugins.IPluginConfig) => T;

    public plugins: Array<Plugins.IPlugin>;

    constructor() {
        this.plugins = [];
    }

    createPlugins(config: Array<Plugins.IPluginConfig>) {
        this.plugins = config.map((c) => this.factory<Plugins.IPlugin>(c));
    }
}