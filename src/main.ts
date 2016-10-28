import {Orm} from './orm';
import {Movie} from "./orm/entities/movie";

(async function () {
	await Orm.init();

	let movie = await Orm.instance
		.createQueryBuilder(Movie, 'movie')
		.where('movie.title LIKE :keyword')
		.setParameter('keyword', '%batman%')
		.setOffset(5)
		.setLimit(3)
		.getResults();

	console.log(movie);
})();
