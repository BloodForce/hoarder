import { injectable } from 'inversify';
import { IMovie } from './../index';
import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

@Table()
@injectable()
export class Movie implements IMovie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	year: number;
}
