import 'reflect-metadata';
import {PluginRegistry} from "./plugin/plugin-registry";
import {ITorrentProviderPlugin} from "../../types/index";

let r = new PluginRegistry();
let factory = require('hoarder-plugin-hd-torrents').default;
let symbol = factory(r);
let hdTorrents = r.find<ITorrentProviderPlugin>(symbol);

console.log(11111)

hdTorrents.findTorrents();
