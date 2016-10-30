import { Connection, QueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export enum PLUGIN_TYPE {
	TORRENT_PROVIDER,
	MATCH_ENGINE
};

export interface IRepository<T> {
    findOne(options?: ObjectLiteral): Promise<T>;
    find(options?: ObjectLiteral): Promise<T>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
	remove(entity: T): Promise<T>;
	queryBuilder(): QueryBuilder<T>;
}

export interface IDatabaseProvider {
	connection: Connection;
    connect(): Promise<Connection>
}

export interface IPlugin {
	id?: number;
	name: string;
	type: PLUGIN_TYPE
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
	plugins: Array<IPlugin>;
}
