import 'reflect-metadata';
import { kernel } from './inversify.config';
import { TYPES } from './inversify.types';
import { IMovie, IDatabaseProvider, IRepository } from './library/orm';

let orm = kernel.get<IDatabaseProvider>(TYPES.DATABASE_PROVIDER);
let repo;

orm.init()
    .then(() => {
        repo = kernel.get<IRepository<IMovie>>(TYPES.MOVIE_REPOSITORY);
    })
    .then(() => repo.create({
        title: 'Aliens',
        description: 'Aliens fuck yeah!',
        year: 1988
    }))
    .then(() => repo.find())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
