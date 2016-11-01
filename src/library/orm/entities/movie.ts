import { IEntity } from './';
import * as console from 'console';
import { injectable } from 'inversify';
import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

export interface IMovieEntity extends IEntity {
	id?: number;
	title: string;
	description: string;
	year: number;
}

@Table()
@injectable()
export class MovieEntity implements IMovieEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
