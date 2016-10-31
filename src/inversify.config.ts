import { TYPES } from './inversify.types';
import { Orm, Plugins } from './library';
import { DatabaseProvider } from './library/orm/database-provider';
import { MovieRepository } from './library/orm/repositories/movie';
import { SeedBoxRepository } from './library/orm/repositories/seed-box';
import { TvShowRepository } from './library/orm/repositories/tv-show';
import { SeedBox } from './library/seed-box/';
import { DefaultMatchEngine } from './plugins/match-engines/default';
import { HDTorrents } from './plugins/torrent-providers/hd-torrents';
import { PirateBay } from './plugins/torrent-providers/pirate-bay';
import { interfaces, Kernel } from 'inversify';
import { autoProvide } from 'inversify-binding-decorators';
import { ConnectionManager, useContainer } from 'typeorm';

let kernel = new Kernel();

// ORM Bindings
autoProvide(kernel, [ConnectionManager]);
useContainer(kernel, {
    fallback: true,
    fallbackOnErrors: true
})
kernel.bind<Orm.IDatabaseProvider>(TYPES.DATABASE_PROVIDER).to(DatabaseProvider).inSingletonScope();
kernel.bind<Orm.IRepository<Orm.IMovieEntity>>(TYPES.MOVIE_REPOSITORY).to(MovieRepository).inSingletonScope();
kernel.bind<Orm.IRepository<Orm.ITvShowEntity>>(TYPES.TV_SHOW_REPOSITORY).to(TvShowRepository).inSingletonScope();
kernel.bind<Orm.IRepository<Orm.ISeedBoxEntity>>(TYPES.SEED_BOX_REPOSITORY).to(SeedBoxRepository).inSingletonScope();

// SeedBox/Plugin Bindings
kernel.bind(TYPES.SEED_BOX).to(SeedBox);
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
