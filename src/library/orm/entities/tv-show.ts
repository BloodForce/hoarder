import { ITvShow } from '../';
import { injectable } from 'inversify';
import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

@Table()
@injectable()
export class TvShow implements ITvShow {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
