import { Connection, ConnectionManager, createConnection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { IDatabaseProvider } from './';

@injectable()
export class DatabaseProvider implements IDatabaseProvider {
	@inject(ConnectionManager)
	private connectionManager: ConnectionManager;

	public connection: Connection;

	async connect() {
		this.connection = await createConnection({
			driver: {
				type: 'sqlite',
				storage: 'build/hoarder.sqlite'
			},
			entities: [
				__dirname + '/entities/*.js'
			],
			autoSchemaSync: true
		});

		return this.connection;
	}
}