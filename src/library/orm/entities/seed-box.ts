import { IEntity } from './';
import { IPluginEntity, PluginEntity } from './plugin';
import { injectable } from 'inversify';
import { Column, OneToMany, PrimaryGeneratedColumn, Table } from 'typeorm';

export interface ISeedBoxEntity extends IEntity {
    id?: number;
	name: string;
	description: string;
	plugins: Array<IPluginEntity>;
}

@Table()
@injectable()
export class SeedBoxEntity implements ISeedBoxEntity {
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
