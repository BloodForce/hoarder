import { MovieRepository } from './library/orm/repositories/movie';
import { IMoveRepository } from './library/orm/repositories/index';
import { useContainer, createConnection, Connection, ConnectionManager } from 'typeorm';
import { Movie } from './library/orm/entities/movie';
import { Kernel, interfaces } from 'inversify';
import { IPlugin, IPluginFactory, IMatchEnginePlugin, ITorrentProviderPlugin } from './library/plugin';
import { PluginFactory } from './library/plugin/plugin-factory';
import { ISeedBox } from './library/seed-box';
import { SeedBox } from './library/seed-box/seed-box';
import { HDTorrents } from './plugins/torrent-providers/hd-torrents';
import { DefaultMatchEngine } from './plugins/match-engines/default';
import { PirateBay } from './plugins/torrent-providers/pirate-bay';
import { TYPES } from './inversify.types';

let kernel = new Kernel();

useContainer(kernel);
kernel.bind<ISeedBox>(TYPES.SEED_BOX).to(SeedBox);
kernel.bind<IPlugin>(TYPES.PLUGIN).to(HDTorrents).whenTargetNamed('hd-torrents');
kernel.bind<IPlugin>(TYPES.PLUGIN).to(PirateBay).whenTargetNamed('pirate-bay');
kernel.bind<IPlugin>(TYPES.PLUGIN).to(DefaultMatchEngine).whenTargetNamed('default');
kernel.bind<IPluginFactory>(TYPES.PLUGIN_FACTORY).to(PluginFactory);
kernel.bind<ConnectionManager>('con-man').to(ConnectionManager);
kernel.bind<interfaces.Provider<Connection>>(TYPES.ORM_CONNECTION).toProvider<Connection>((context) => {
    return () => {
		console.log('CREATING CONNECTION')
        return createConnection({
			driver: {
				type: 'sqlite',
				storage: 'build/hoarder.sqlite'
			},
			entities: [
				__dirname + '/entities/*.js'
			],
			autoSchemaSync: true
		});
    };
});
kernel.bind<interfaces.Factory<IMatchEnginePlugin>>(TYPES.MATCH_ENGINE_FACTORY).toFactory<IMatchEnginePlugin>((context) => {
    return (config: any) => {
        let plugin = context.kernel.getNamed<IMatchEnginePlugin>(TYPES.PLUGIN, config.type);

        plugin.init(config);

        return plugin;
    };
});
kernel.bind<interfaces.Factory<ITorrentProviderPlugin>>(TYPES.TORRENT_PROVIDER_FACTORY).toFactory<ITorrentProviderPlugin>((context) => {
    return (config: any) => {
        let plugin = context.kernel.getNamed<ITorrentProviderPlugin>(TYPES.PLUGIN, config.type);

        plugin.init(config);

        return plugin;
    };
});

export { kernel };
