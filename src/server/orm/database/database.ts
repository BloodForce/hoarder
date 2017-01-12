import {Repository} from 'typeorm';
import {DatabaseContext} from './connection';
import {MovieEntity} from '../entities/movie';
import {PluginEntity} from '../entities/plugin';
import {SeedBoxEntity} from '../entities/seed-box';
import {TvShowEntity} from '../entities/tv-show';
import {ConfigEntity} from "../entities/config";

export class Database {
	private context: DatabaseContext;

	constructor(context: DatabaseContext) {
		this.context = context;
	}

	async connect(): Promise<Database> {
		return this.context.connect().then(() => this);
	}

	get seedbox(): Repository<SeedBoxEntity> {
		return this.context.connection.getRepository<SeedBoxEntity>(SeedBoxEntity);
	}

	get plugins(): Repository<PluginEntity> {
		return this.context.connection.getRepository<PluginEntity>(PluginEntity);
	}

	get tvShows(): Repository<TvShowEntity> {
		return this.context.connection.getRepository<TvShowEntity>(TvShowEntity);
	}

	get movies(): Repository<MovieEntity> {
		return this.context.connection.getRepository<MovieEntity>(MovieEntity);
	}

	get config(): Repository<ConfigEntity> {
		return this.context.connection.getRepository<ConfigEntity>(ConfigEntity);
	}
}
