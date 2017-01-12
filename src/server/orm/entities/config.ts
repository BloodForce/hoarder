import {Column, PrimaryGeneratedColumn, Table} from 'typeorm';

@Table()
export class ConfigEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('int')
	rssPollInterval: number;

	@Column('int')
	torrentClientPollInterval: number;
}
