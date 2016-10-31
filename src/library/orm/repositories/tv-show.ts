import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider } from '../database-provider';
import { ITvShowEntity, TvShowEntity } from '../entities/tv-show';
import { IRepository } from './';
import { inject, injectable } from 'inversify';
import { FindOptions, Repository } from 'typeorm';

@injectable()
export class TvShowRepository implements IRepository<ITvShowEntity> {
    private repository: Repository<ITvShowEntity>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository(TvShowEntity);
    }

    findOne() {
        return this.repository.findOne();
    }

    find(options: FindOptions) {
        return this.repository.find();
    }

    create(object: ITvShowEntity) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: ITvShowEntity) {
        return this.repository.persist(entity);
    }

    remove(entity: ITvShowEntity) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('tv-show');
    }
}