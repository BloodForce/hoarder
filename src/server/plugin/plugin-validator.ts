export class PluginValidator {
    validate(pluginExports: any) {
        let keys = Object.keys(pluginExports);

        if (keys.length > 1) {
            return false;
        }

        let plugin = pluginExports[keys[0]];

        return (typeof plugin.NAME === 'string') && (!!plugin.TYPE);
    }
}
