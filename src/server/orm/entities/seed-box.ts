import { Column, OneToMany, PrimaryGeneratedColumn, Table } from 'typeorm';
import { PluginEntity } from './plugin';

@Table()
export class SeedBoxEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@OneToMany(type => PluginEntity, plugin => plugin.seedBox, {
		cascadeAll: true,
	})
    plugins: Array<PluginEntity>;
}
