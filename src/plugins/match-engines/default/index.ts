import { Plugins } from '../../../library';

@Plugins.registerMatchEngine()
export class DefaultMatchEngine implements Plugins.IMatchEnginePlugin {
	init(config: any) {
		console.log(config)
	}

	match() {
		console.log('Default match engine running...')
	}
}
