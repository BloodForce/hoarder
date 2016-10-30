import { ISeedBox } from '../';
import { injectable } from 'inversify';
import { Column, PrimaryGeneratedColumn, Table } from 'typeorm';

@Table()
@injectable()
export class SeedBox implements ISeedBox {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;
}
