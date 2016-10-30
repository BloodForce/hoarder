import { SeedBox } from './library/seed-box';
import 'reflect-metadata';
import { kernel } from './inversify.config';
import { TYPES } from './inversify.types';
import { IDatabaseProvider, IRepository, ISeedBox, PLUGIN_TYPE } from './library/orm';
import { IPluginConfig } from './library/plugin';
import { inject } from 'inversify';

let repo: IRepository<ISeedBox>;
let database = kernel.get<IDatabaseProvider>(TYPES.DATABASE_PROVIDER);

// DISCLAIMER - This is very basic/early prototype of a "structure" & approach. In reality, plugins will be external to this project and "installed", probably via NPM

// UNCOMMENT ME TO CREATE A SEEDBOX
// let seedBoxData: ISeedBox = {
//     name: 'Seedbox.cc',
//     description: 'Primary Seed Box',
//     plugins: [{
//         name: 'HD Torrents',
//         type: PLUGIN_TYPE.TORRENT_PROVIDER
//     }, {
//         name: 'Default Match Engine',
//         type: PLUGIN_TYPE.MATCH_ENGINE
//     }]
// };

// database.connect()
//     .then(() => {
//         repo = kernel.get<IRepository<ISeedBox>>(TYPES.SEED_BOX_REPOSITORY);
//     })
//     .then(() => repo.create(seedBoxData))
//     .then(() => repo
//         .queryBuilder()
//         .innerJoinAndSelect('seed-box.plugins', 'plugin')
//         .getResults())
//     .then((data) => console.log(data))
//     .catch((e) => console.log(e));

// UNCOMMENT ME AFTER YOU HAVE CREATED A SEEDBOX (ABOVE)
// let seedBox = kernel.get<SeedBox>(TYPES.SEED_BOX);

// database
//     .connect()
//     .then(() => {
//         repo = kernel.get<IRepository<ISeedBox>>(TYPES.SEED_BOX_REPOSITORY);
//     })
//     .then(() => repo
//         .queryBuilder()
//         .innerJoinAndSelect('seed-box.plugins', 'plugin')
//         .getResults())
//     .then((seedboxes) => seedBox.createPlugins(seedboxes[0].plugins))
//     .then(() => {
//         seedBox.providers.forEach((provider) => provider.findTorrents());
//         seedBox.matchEngine.match();
//     })
//     .catch((e) => console.log(e))
