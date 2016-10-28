import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

@Table()
export class SeedBox {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;
}
