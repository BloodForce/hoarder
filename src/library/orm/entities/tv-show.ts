import { IEntity } from './';
import { injectable } from 'inversify';
import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

export interface ITvShowEntity extends IEntity {
	id?: number;
	title: string;
	description: string;
	year: number;
}

@Table()
@injectable()
export class TvShowEntity implements ITvShowEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
