import {HtmlPluginState} from '../types.js'

/**
 * Cancels currently running plugins. This is called from unmount or update
 * @param pluginState {HtmlPluginState} Holds cleanup callbacks and event subscriptions
 */
export function cancelCurrentlyRunningPlugins(pluginState: HtmlPluginState): void{
    pluginState.cleanupCallbacks.forEach((fn: any) => {
        fn();// resolve each promise with 'canceled'
    })
}
