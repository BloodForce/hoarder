import { injectable } from 'inversify';
import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

export interface IMovieEntity {
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
