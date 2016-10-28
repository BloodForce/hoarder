import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';

export class Orm {
	private static connection: Connection;

	public static get instance() {
		if (!this.connection) {
			throw new Error('Hoarder ORM has not been initialised!');
		}

		return this.connection.entityManager;
	}

	static async init() {
		this.connection = await createConnection({
			driver: {
				type: 'sqlite',
				storage: 'build/hoarder.sqlite'
			},
			entities: [
				__dirname + '/entities/*.js'
			],
			autoSchemaSync: true,
		});
	}
}
