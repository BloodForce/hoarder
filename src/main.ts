import 'reflect-metadata';
import {Orm} from './orm';
import {Movie} from "./orm/entities/movie";


import {injectable, inject, interfaces, Kernel} from 'inversify';

const TYPES = {
	PLUGIN: Symbol('PLUGIN'),
	TORRENT_PROVIDER_FACTORY: Symbol('TORRENT_PROVIDER_FACTORY'),
	MATCH_ENGINE_FACTORY: Symbol('MATCH_ENGINE_FACTORY'),
	PLUGIN_FACTORY: Symbol('PLUGIN_FACTORY'),
	SEEDBOX: Symbol('SEEDBOX')
};

interface ISeedBox {
	provider: ITorrentProviderPlugin;
	match: IMatchEnginePlugin;
}

interface IPluginFactory {
	createProvider(config: any): ITorrentProviderPlugin;
	createMatch(config: any): IMatchEnginePlugin;
}

interface IPlugin {
	init(config: any): void;
}

interface ITorrentProviderPlugin extends IPlugin {
	findTorrents();
}

interface IMatchEnginePlugin extends IPlugin {
	match();
}

@injectable()
class DefaultMatchEngine implements IMatchEnginePlugin {
	init(config: any) {
		console.log(config)
	}

	match() {
		console.log('Default match engine running...')
	}
}

@injectable()
class HDTorrents implements ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('HDTorrents is looking for torrents');
	}
}

@injectable()
class PirateBay implements ITorrentProviderPlugin {
	init(config: any) {
		console.log(config)
	}

	findTorrents() {
		console.log('Pirate Bay is looking for torrents');
	}
}

@injectable()
class PluginFactory implements IPluginFactory{
	private providerFactory: (config: any) => ITorrentProviderPlugin;
	private matchFactory: (config: any) => IMatchEnginePlugin;

	constructor(@inject(TYPES.TORRENT_PROVIDER_FACTORY) providerFactory: <T extends ITorrentProviderPlugin>(config: any) => T,
				@inject(TYPES.MATCH_ENGINE_FACTORY) matchFactory: <T extends IMatchEnginePlugin>(config: any) => T) {
		this.providerFactory = providerFactory;
		this.matchFactory = matchFactory;
	}

	createProvider(config: any) {
		return this.providerFactory(config);
	}

	createMatch(config: any) {
		return this.matchFactory(config);
	}
}

@injectable()
class SeedBox implements ISeedBox {
	provider: ITorrentProviderPlugin;
	match: IMatchEnginePlugin;

	constructor(@inject(TYPES.PLUGIN_FACTORY) pluginFactory: PluginFactory) {
		this.provider = pluginFactory.createProvider({
			type: 'pirate-bay'
		});

		this.match = pluginFactory.createMatch({
			type: 'default'
		});
	}
}

let kernel = new Kernel();
kernel.bind<ISeedBox>(TYPES.SEEDBOX).to(SeedBox);
kernel.bind<IPlugin>(TYPES.PLUGIN).to(HDTorrents).whenTargetNamed('hd-torrents');
kernel.bind<IPlugin>(TYPES.PLUGIN).to(PirateBay).whenTargetNamed('pirate-bay');
kernel.bind<IPlugin>(TYPES.PLUGIN).to(DefaultMatchEngine).whenTargetNamed('default');
kernel.bind<IPluginFactory>(TYPES.PLUGIN_FACTORY).to(PluginFactory);
kernel.bind<interfaces.Factory<IPlugin>>(TYPES.MATCH_ENGINE_FACTORY).toFactory<IPlugin>((context) => {
	return (config: any) => {
		let plugin = context.kernel.getNamed<IPlugin>(TYPES.PLUGIN, config.type);

		plugin.init(config);

		return plugin;
	};
});
kernel.bind<interfaces.Factory<IPlugin>>(TYPES.TORRENT_PROVIDER_FACTORY).toFactory<IPlugin>((context) => {
	return (config: any) => {
		let plugin = context.kernel.getNamed<IPlugin>(TYPES.PLUGIN, config.type);

		plugin.init(config);

		return plugin;
	};
});


let seedbox = kernel.get<ISeedBox>(TYPES.SEEDBOX);
seedbox.provider.findTorrents();
seedbox.match.match();

// (async function () {
// 	await Orm.init();
//
// 	let movies = await Orm.instance
// 		.createQueryBuilder(Movie, 'movie')
// 		.where('movie.title LIKE :keyword')
// 		.setParameter('keyword', '%batman%')
// 		.setOffset(5)
// 		.setLimit(3)
// 		.getResults();
// })();

