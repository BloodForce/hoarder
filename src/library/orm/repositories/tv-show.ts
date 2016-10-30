import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider, ITvShow } from '../../orm';
import { TvShow } from '../entities/tv-show';
import { IRepository } from '../index';
import { inject, injectable } from 'inversify';
import { FindOptions, Repository } from 'typeorm';

@injectable()
export class TvShowRepository implements IRepository<ITvShow> {
    private repository: Repository<ITvShow>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository(TvShow);
    }

    findOne() {
        return this.repository.findOne();
    }

    find(options: FindOptions) {
        return this.repository.find();
    }

    create(object: ITvShow) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: ITvShow) {
        return this.repository.persist(entity);
    }

    remove(entity: ITvShow) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('tv-show');
    }
}