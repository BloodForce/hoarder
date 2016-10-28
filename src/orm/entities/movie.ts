import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

@Table()
export class Movie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
