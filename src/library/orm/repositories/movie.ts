import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider, IMovie } from '../../orm';
import { Movie } from '../entities/movie';
import { IRepository } from '../index';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@injectable()
export class MovieRepository implements IRepository<IMovie> {
    private repository: Repository<IMovie>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository(Movie);
    }

    findOne(options?: ObjectLiteral) {
        return this.repository.findOne(options);
    }

    find(options: ObjectLiteral) {
        return this.repository.find(options);
    }

    create(object: IMovie) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: IMovie) {
        return this.repository.persist(entity);
    }

    remove(entity: IMovie) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('movie');
    }
}