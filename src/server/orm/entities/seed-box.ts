import { Column, OneToMany, PrimaryGeneratedColumn, Table } from 'typeorm';
import { PluginEntity } from './plugin';

interface IScheduleConfig {
	rssPollInterval: number;
	torrentClientPollInterval: number;
}

@Table()
export class SeedBoxEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('string')
	name: string;

	@Column('string')
	description: string;

	@Column('json')
	scheduleConfig: IScheduleConfig;

	@OneToMany(type => PluginEntity, plugin => plugin.seedBox, {
		cascadeAll: true,
	})
    plugins: Array<PluginEntity>;
}
