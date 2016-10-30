import { TYPES } from './inversify.types';
import { IDatabaseProvider, IMovie, IRepository, ISeedBox, ITvShow, PLUGIN_TYPE } from './library/orm';
import { DatabaseProvider } from './library/orm/database-provider';
import { MovieRepository } from './library/orm/repositories/movie';
import { SeedBoxRepository } from './library/orm/repositories/seed-box';
import { TvShowRepository } from './library/orm/repositories/tv-show';
import { IPlugin, IPluginConfig } from './library/plugin';
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
kernel.bind<IDatabaseProvider>(TYPES.DATABASE_PROVIDER).to(DatabaseProvider).inSingletonScope();
kernel.bind<IRepository<IMovie>>(TYPES.MOVIE_REPOSITORY).to(MovieRepository).inSingletonScope();
kernel.bind<IRepository<ITvShow>>(TYPES.TV_SHOW_REPOSITORY).to(TvShowRepository).inSingletonScope();
kernel.bind<IRepository<ISeedBox>>(TYPES.SEED_BOX_REPOSITORY).to(SeedBoxRepository).inSingletonScope();

// SeedBox/Plugin Bindings
kernel.bind(TYPES.SEED_BOX).to(SeedBox);
kernel.bind<IPlugin>(TYPES.PLUGIN).to(HDTorrents).whenTargetNamed(HDTorrents.NAME);
kernel.bind<IPlugin>(TYPES.PLUGIN).to(PirateBay).whenTargetNamed(PirateBay.NAME);
kernel.bind<IPlugin>(TYPES.PLUGIN).to(DefaultMatchEngine).whenTargetNamed(DefaultMatchEngine.NAME);
kernel.bind<interfaces.Factory<IPlugin>>(TYPES.PLUGIN_FACTORY).toFactory<IPlugin>((context: interfaces.Context) => {
    return <T extends IPlugin>(config: IPluginConfig): T => {
        switch (config.type) {
            case PLUGIN_TYPE.TORRENT_PROVIDER:
                return context.kernel.getNamed<T>(TYPES.PLUGIN, config.name);
            case PLUGIN_TYPE.MATCH_ENGINE:
                return context.kernel.getNamed<T>(TYPES.PLUGIN, config.name);
        }
    };
});

export { kernel };
