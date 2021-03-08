import {htmlPluginState} from '../types'

/**
 * Cancels currently running plugins. This is called from unmount or update
 * @param pluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions
 */
export function cancelCurrentlyRunningPlugins(pluginState: htmlPluginState): void{
    pluginState.cleanupCallbacks.forEach((fn: any) => {
        fn();// resolve each promise with 'canceled'
    })
}
