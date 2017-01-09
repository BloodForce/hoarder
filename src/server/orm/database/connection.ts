import * as path from 'path';
import { Connection, createConnection } from 'typeorm';

export class DatabaseContext {
	private _connection: Connection;

	get connection(): Connection {
		return this._connection;
	}

	async connect() {
		this._connection = await createConnection({
			driver: {
				type: 'sqlite',
				storage: 'build/hoarder.sqlite'
			},
			entities: [
				path.resolve(__dirname, '../entities/*.js')
			],
			autoSchemaSync: true
		});

		return this._connection;
	}
}
