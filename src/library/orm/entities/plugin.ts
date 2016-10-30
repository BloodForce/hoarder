import { SeedBox } from './seed-box';
import { IPlugin, PLUGIN_TYPE } from '../';
import { injectable } from 'inversify';
import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';


@Table()
@injectable()
export class Plugin implements IPlugin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('int')
    type: PLUGIN_TYPE

    @ManyToOne(type => SeedBox, seedBox => seedBox.plugins)
    seedBox: SeedBox;
}