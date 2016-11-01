import { TYPES } from '../../../inversify.types';
import { IMovieEntity, MovieEntity } from '../entities/movie';
import { IPluginEntity, PluginEntity } from '../entities/plugin';
import { ISeedBoxEntity, SeedBoxEntity } from '../entities/seed-box';
import { ITvShowEntity, TvShowEntity } from '../entities/tv-show';
import { IDatabaseContext } from './connection';
import { inject, injectable } from 'inversify';
import { Connection, Repository } from 'typeorm';

export interface IDatabase {
    connect(): Promise<Connection>;
    seedbox: Repository<ISeedBoxEntity>;
    plugins: Repository<IPluginEntity>;
    tvShows: Repository<ITvShowEntity>;
    movies: Repository<IMovieEntity>;
}

@injectable()
export class Database implements IDatabase {
    @inject(TYPES.DATABASE_CONTEXT)
    private context: IDatabaseContext;

    connect(): Promise<Connection> {
        return this.context.connect();
    }

    get seedbox(): Repository<ISeedBoxEntity> {
        return this.context.connection.getRepository<ISeedBoxEntity>(SeedBoxEntity);
    }

    get plugins(): Repository<IPluginEntity> {
        return this.context.connection.getRepository<IPluginEntity>(PluginEntity);
    }

    get tvShows(): Repository<ITvShowEntity> {
        return this.context.connection.getRepository<ITvShowEntity>(TvShowEntity);
    }

    get movies(): Repository<IMovieEntity> {
        return this.context.connection.getRepository<IMovieEntity>(MovieEntity);
    }
}