import {IPluginRegistry, INotifierPlugin, IPluginConfig} from "../../../types/index";

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

export default (registry: IPluginRegistry) => {
	return registry.registerNotifier(PushBulletPlugin);
};
