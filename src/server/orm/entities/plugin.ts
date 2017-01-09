import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';
import { PLUGIN_TYPE } from '../../plugin';
import { SeedBoxEntity } from './seed-box';

@Table()
export class PluginEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('int')
    type: PLUGIN_TYPE;

    @ManyToOne(type => SeedBoxEntity, seedBox => seedBox.plugins)
    seedBox: SeedBoxEntity;
}
