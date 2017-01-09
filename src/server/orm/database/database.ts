import {MovieEntity} from '../entities/movie';
import {PluginEntity} from '../entities/plugin';
import {SeedBoxEntity} from '../entities/seed-box';
import {TvShowEntity} from '../entities/tv-show';
import {DatabaseContext} from './connection';
import {Connection, Repository} from 'typeorm';

export class Database {
	private context: DatabaseContext;

	connect(): Promise<Connection> {
		return this.context.connect();
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
}
