import {IPluginConfig} from "../../../types/index";

export class SeedBox {
	private factory: <T>(config: IPluginConfig) => T;

	public plugins: Array<any>;

	constructor() {
		this.plugins = [];
	}

	createPlugins(config: Array<IPluginConfig>) {
		this.plugins = config.map((c) => this.factory<any>(c));
	}
}
