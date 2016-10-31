import { QueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export interface IRepository<T> {
    findOne(options?: ObjectLiteral): Promise<T>;
    find(options?: ObjectLiteral): Promise<T>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
	remove(entity: T): Promise<T>;
	queryBuilder(): QueryBuilder<T>;
}