import * as console from 'console';
import { TYPES } from './inversify.types';
import { Orm, Plugins, Seedboxes } from './library';
import { DatabaseContext } from './library/orm/database/connection';
import { Database } from './library/orm/database/database';
import { interfaces, Kernel } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';

let kernel = new Kernel();
let provide = makeFluentProvideDecorator(kernel);

// ORM Bindings
kernel.bind<Orm.IDatabaseContext>(TYPES.DATABASE_CONTEXT).to(DatabaseContext).inSingletonScope();
kernel.bind<Orm.IDatabase>(TYPES.DATABASE).to(Database).inSingletonScope();

// SeedBox/Plugin Bindings
kernel.bind<Seedboxes.ISeedBox>(TYPES.SEED_BOX).to(Seedboxes.SeedBox);

export { kernel, provide };
