import {IPluginRegistry, INotifierPlugin, IPluginConfig, IPluginRegistryEntry} from "../../../types/index";

class PushBulletPlugin implements INotifierPlugin {
	config: IPluginConfig;

	constructor(config: IPluginConfig) {
		console.log(config);
	}

	send() {
		console.log('Push Bullet is sending a message');
		return Promise.resolve();
	}
}

export default (registry: IPluginRegistry): IPluginRegistryEntry => {
	return registry.registerNotifier(PushBulletPlugin);
};
