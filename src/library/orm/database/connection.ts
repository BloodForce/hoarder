import * as path from 'path';
import { injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';

export interface IDatabaseContext {
	connection: Connection;
	connect(): Promise<Connection>
}

@injectable()
export class DatabaseContext implements IDatabaseContext {
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