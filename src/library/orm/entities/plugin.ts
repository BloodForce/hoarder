import { PLUGIN_TYPE } from '../../plugin';
import { SeedBoxEntity } from './seed-box';
import { injectable } from 'inversify';
import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';

export interface IPluginEntity {
	id?: number;
	name: string;
	type: PLUGIN_TYPE
}

@Table()
@injectable()
export class PluginEntity implements IPluginEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('int')
    type: PLUGIN_TYPE

    @ManyToOne(type => SeedBoxEntity, seedBox => seedBox.plugins)
    seedBox: SeedBoxEntity;
}