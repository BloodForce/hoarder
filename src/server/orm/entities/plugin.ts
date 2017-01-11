import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';
import { SeedBoxEntity } from './seed-box';

@Table()
export class PluginEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @ManyToOne(type => SeedBoxEntity, seedBox => seedBox.plugins)
    seedBox: SeedBoxEntity;
}
