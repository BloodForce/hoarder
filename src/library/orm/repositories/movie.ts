import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider } from '../../orm';
import { Movie } from '../entities/movie';
import { IRepository } from '../index';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@injectable()
export class MovieRepository implements IRepository<Movie> {
    private repository: Repository<Movie>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository(Movie);
    }

    findOne(options?: ObjectLiteral) {
        return this.repository.findOne(options);
    }

    find(options: ObjectLiteral) {
        return this.repository.find(options);
    }

    create(object: Movie) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: Movie) {
        return this.repository.persist(entity);
    }
}