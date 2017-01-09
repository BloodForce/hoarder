import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

@Table()
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
