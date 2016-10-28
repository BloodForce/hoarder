import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

@Table()
export class TvShow {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
