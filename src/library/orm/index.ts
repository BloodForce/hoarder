import { Connection } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export interface IRepository<T> {
    findOne(options: ObjectLiteral): Promise<T>;
    find(options: ObjectLiteral): Promise<T>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
}

export interface IDatabaseProvider {
	connection: Connection;
    connect(): Promise<Connection>
}

export interface IMovie {
	id?: number;
	title: string;
	description: string;
	year: number;
}

export interface ITvShow {
	id?: number;
	title: string;
	description: string;
	year: number;
}

export interface ISeedBox {
    id?: number;
	name: string;
	description: string;
}
