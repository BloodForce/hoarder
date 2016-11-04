import { TYPES } from './inversify.types';
import 'reflect-metadata';
import { Plugins } from './library';
import { kernel } from './inversify.config';
import { PluginLocator } from './library/plugin/plugin-locator';
import * as console from 'console';

let pluginLocator = new PluginLocator();

pluginLocator
    .findAndInject()
    .then(() => {
        // kernel.getNamed<Plugins.ITorrentProviderPlugin>(TYPES.TORRENT_PROVIDER, 'HDTorrents').findTorrents();
        let plugins = pluginLocator.getInstalled(['HDTorrents', 'PirateBay', 'Transmission', 'Tmdb', 'DefaultMatchEngine']);

        plugins.providers.forEach((p) => p.findTorrents());
        plugins.clients.forEach((p) => p.uploadTorrent());
        plugins.engines.forEach((p) => p.match());
        plugins.databases.forEach((p) => p.search());
    })

// let database = kernel.get<Orm.IDatabase>(TYPES.DATABASE);

// DISCLAIMER - This is very basic/early prototype of a "structure" & approach. In reality, plugins will be external to this project and "installed", probably via NPM

// // UNCOMMENT ME TO CREATE A SEEDBOX
// database.connect()
//     .then(() => database.seedbox.create({
//         name: 'Seedbox.cc',
//         description: 'Primary Seed Box',
//         plugins: [{
//             name: HDTorrents.NAME,
//             type: HDTorrents.TYPE
//         }, {
//             name: DefaultMatchEngine.NAME,
//             type: DefaultMatchEngine.TYPE
//         }, {
//             name: PirateBay.NAME,
//             type: PirateBay.TYPE
//         }]
//     }))
//     .then(() => database.seedbox
//         .createQueryBuilder('seed-box')
//         .innerJoinAndSelect('seed-box.plugins', 'plugin')
//         .getResults())
//     .then((data) => console.log(data))
//     .catch((e) => console.log(e));


// // UNCOMMENT ME AFTER YOU HAVE CREATED A SEEDBOX (ABOVE)
// let seedBox = kernel.get<Seedboxes.ISeedBox>(TYPES.SEED_BOX);

// database
//     .connect()
//     .then(() => database.seedbox
//         .createQueryBuilder('seed-box')
//         .innerJoinAndSelect('seed-box.plugins', 'plugin')
//         .getResults())
//     .then((seedBoxes) => {
//         console.log(seedBox.createPlugins, seedBoxes);
//         seedBox.createPlugins(seedBoxes[0].plugins)
//     })
//     .then(() => {
//         seedBox.plugins.forEach((plugin) => console.log(plugin))
//     })
//     .catch((e) => console.log(e));
