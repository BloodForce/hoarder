import { TYPES } from './inversify.types';
import { Orm, Plugins, Seedboxes } from './library';
import { DatabaseContext } from './library/orm/database/connection';
import { Database } from './library/orm/database/database';
import { DefaultMatchEngine } from './plugins/match-engines/default';
import { HDTorrents } from './plugins/torrent-providers/hd-torrents';
import { PirateBay } from './plugins/torrent-providers/pirate-bay';
import { interfaces, Kernel } from 'inversify';

let kernel = new Kernel();

// ORM Bindings
kernel.bind<Orm.IDatabaseContext>(TYPES.DATABASE_CONTEXT).to(DatabaseContext).inSingletonScope();
kernel.bind<Orm.IDatabase>(TYPES.DATABASE).to(Database).inSingletonScope();

// SeedBox/Plugin Bindings
kernel.bind<Seedboxes.ISeedBox>(TYPES.SEED_BOX).to(Seedboxes.SeedBox);
kernel.bind<Plugins.IPlugin>(TYPES.PLUGIN).to(HDTorrents).whenTargetNamed(HDTorrents.NAME);
kernel.bind<Plugins.IPlugin>(TYPES.PLUGIN).to(PirateBay).whenTargetNamed(PirateBay.NAME);
kernel.bind<Plugins.IPlugin>(TYPES.PLUGIN).to(DefaultMatchEngine).whenTargetNamed(DefaultMatchEngine.NAME);
kernel.bind<interfaces.Factory<Plugins.IPlugin>>(TYPES.PLUGIN_FACTORY).toFactory<Plugins.IPlugin>((context: interfaces.Context) => {
    return <T extends Plugins.IPlugin>(config: Plugins.IPluginConfig): T => {
        switch (config.type) {
            case Plugins.PLUGIN_TYPE.TORRENT_PROVIDER:
                return context.kernel.getNamed<T>(TYPES.PLUGIN, config.name);
            case Plugins.PLUGIN_TYPE.MATCH_ENGINE:
                return context.kernel.getNamed<T>(TYPES.PLUGIN, config.name);
        }
    };
});

export { kernel };
