import { ISeedBox } from '../';
import { Plugin } from './plugin';
import { injectable } from 'inversify';
import { Column, OneToMany, PrimaryGeneratedColumn, Table } from 'typeorm';

@Table()
@injectable()
export class SeedBox implements ISeedBox {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@OneToMany(type => Plugin, plugin => plugin.seedBox, {
		cascadeAll: true,
	})
    plugins: Array<Plugin>;
}
