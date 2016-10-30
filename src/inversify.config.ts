import { TYPES } from './inversify.types';
import { IDatabaseProvider, IMovie, IRepository, ISeedBox, ITvShow } from './library/orm';
import { DatabaseProvider } from './library/orm/database-provider';
import { MovieRepository } from './library/orm/repositories/movie';
import { SeedBoxRepository } from './library/orm/repositories/seed-box';
import { TvShowRepository } from './library/orm/repositories/tv-show';
import { Kernel } from 'inversify';
import { autoProvide } from 'inversify-binding-decorators';
import { ConnectionManager } from 'typeorm';

let kernel = new Kernel();

// ORM Bindings
autoProvide(kernel, [ConnectionManager]);
kernel.bind<IDatabaseProvider>(TYPES.DATABASE_PROVIDER).to(DatabaseProvider).inSingletonScope();
kernel.bind<IRepository<IMovie>>(TYPES.MOVIE_REPOSITORY).to(MovieRepository).inSingletonScope();
kernel.bind<IRepository<ITvShow>>(TYPES.TV_SHOW_REPOSITORY).to(TvShowRepository).inSingletonScope();
kernel.bind<IRepository<ISeedBox>>(TYPES.SEED_BOX_REPOSITORY).to(SeedBoxRepository).inSingletonScope();

export { kernel };
