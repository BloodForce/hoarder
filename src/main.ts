import 'reflect-metadata';
import { kernel } from './inversify.config';
import { TYPES } from './inversify.types';
import { Orm, Seedboxes } from './library';
import { DefaultMatchEngine } from './plugins/match-engines/default';
import { HDTorrents } from './plugins/torrent-providers/hd-torrents';
import { PirateBay } from './plugins/torrent-providers/pirate-bay';

let repo: Orm.IRepository<Orm.ISeedBoxEntity>;
let database = kernel.get<Orm.IDatabaseProvider>(TYPES.DATABASE_PROVIDER);

// DISCLAIMER - This is very basic/early prototype of a "structure" & approach. In reality, plugins will be external to this project and "installed", probably via NPM

// UNCOMMENT ME TO CREATE A SEEDBOX
let seedBoxData: Orm.ISeedBoxEntity = {
    name: 'Seedbox.cc',
    description: 'Primary Seed Box',
    plugins: [{
        name: HDTorrents.NAME,
        type: HDTorrents.TYPE
    }, {
        name: DefaultMatchEngine.NAME,
        type: DefaultMatchEngine.TYPE
    }, {
        name: PirateBay.NAME,
        type: PirateBay.TYPE
    }]
};

database.connect()
    .then(() => {
        repo = kernel.get<Orm.IRepository<Orm.ISeedBoxEntity>>(TYPES.SEED_BOX_REPOSITORY);
    })
    .then(() => repo.create(seedBoxData))
    .then(() => repo
        .queryBuilder()
        .innerJoinAndSelect('seed-box.plugins', 'plugin')
        .getResults())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
    

// UNCOMMENT ME AFTER YOU HAVE CREATED A SEEDBOX (ABOVE)
// let seedBox = kernel.get<Seedboxes.ISeedBox>(TYPES.SEED_BOX);

// database
//     .connect()
//     .then(() => {
//         repo = kernel.get<Orm.IRepository<Orm.ISeedBoxEntity>>(TYPES.SEED_BOX_REPOSITORY);
//     })
//     .then(() => repo
//         .queryBuilder()
//         .innerJoinAndSelect('seed-box.plugins', 'plugin')
//         .getResults())
//     .then((seedboxes) => seedBox.createPlugins(seedboxes[0].plugins))
//     .then(() => {
//         seedBox.plugins.forEach((plugin) => console.log(plugin))
//     })
//     .catch((e) => console.log(e))
