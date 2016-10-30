import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider, ISeedBox } from '../../orm';
import { SeedBox } from '../entities/seed-box';
import { IRepository } from '../index';
import { inject, injectable } from 'inversify';
import { FindOptions, Repository } from 'typeorm';

@injectable()
export class SeedBoxRepository implements IRepository<ISeedBox> {
    private repository: Repository<ISeedBox>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository<ISeedBox>(SeedBox);
    }

    findOne() {
        return this.repository.findOne();
    }

    find(options: FindOptions) {
        return this.repository.find();
    }

    create(object: ISeedBox) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: ISeedBox) {
        return this.repository.persist(entity);
    }

    remove(entity: ISeedBox) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('seed-box');
    }
}