import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider } from '../database-provider';
import { ISeedBoxEntity, SeedBoxEntity } from '../entities/seed-box';
import { IRepository } from './';
import { inject, injectable } from 'inversify';
import { FindOptions, Repository } from 'typeorm';

@injectable()
export class SeedBoxRepository implements IRepository<ISeedBoxEntity> {
    private repository: Repository<ISeedBoxEntity>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository<ISeedBoxEntity>(SeedBoxEntity);
    }

    findOne() {
        return this.repository.findOne();
    }

    find(options: FindOptions) {
        return this.repository.find();
    }

    create(object: ISeedBoxEntity) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: ISeedBoxEntity) {
        return this.repository.persist(entity);
    }

    remove(entity: ISeedBoxEntity) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('seed-box');
    }
}