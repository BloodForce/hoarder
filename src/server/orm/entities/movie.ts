import {Column, PrimaryGeneratedColumn, Table} from 'typeorm';

@Table()
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('string')
	title: string;

	@Column('string')
	description: string;

	@Column('smallint')
	year: number;
}
