import {IPluginConstructor} from "../../../types/index";

export class PluginRegistry {
	private plugins: Map<symbol, IPluginConstructor>;

	private register(ctor: IPluginConstructor) {
		let symbol = Symbol(1);

		this.plugins.set(symbol, ctor);

		return symbol;
	}

	constructor() {
		this.plugins = new Map();
	}

	find<T>(symbol: symbol) {
		let Plugin = this.plugins.get(symbol);

		if (Plugin) {
			return <T>new Plugin({
				name: 'foo',
				type: symbol
			});
		}

		return null;
	}

	registerMatchEngine(ctor: IPluginConstructor) {
		return this.register(ctor);
	}

	registerTorrentProvider(ctor: IPluginConstructor) {
		return this.register(ctor);
	}

	registerTorrentClient(ctor: IPluginConstructor) {
		return this.register(ctor);
	}

	registerMediaDatabase(ctor: IPluginConstructor) {
		return this.register(ctor);
	}
}
