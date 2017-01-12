import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';
import { SeedBoxEntity } from './seed-box';
import {IPluginConfig} from "../../../../types/index";

@Table()
export class PluginEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('string')
    name: string;

    @Column('json')
	config: IPluginConfig;

    @ManyToOne(type => SeedBoxEntity, seedBox => seedBox.plugins)
    seedBox: SeedBoxEntity;
}
