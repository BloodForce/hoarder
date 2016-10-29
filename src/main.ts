import { Orm } from './library/orm/index';
import { IMoveRepository } from './library/orm/repositories/index';
import { Movie } from './library/orm/entities/movie';
import 'reflect-metadata';
import { ISeedBox } from "./library/seed-box";
import { kernel } from "./inversify.config";
import { TYPES } from "./inversify.types";

    console.log(kernel.get(TYPES.ORM_CONNECTION)());

// kernel.get<IMoveRepository>(TYPES.MOVIE_REPOSITORY).getFoo();

// let seedbox = kernel.get<ISeedBox>(TYPES.SEED_BOX);
// seedbox.init().then(() => {
//     seedbox.provider.findTorrents();
//     seedbox.match.match();
// });

// (async function () {
// 	await Orm.init();
//
// 	let movies = await Orm.instance
// 		.createQueryBuilder(Movie, 'movie')
// 		.where('movie.title LIKE :keyword')
// 		.setParameter('keyword', '%batman%')
// 		.setOffset(5)
// 		.setLimit(3)
// 		.getResults();
// })();

