import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, accessibilityMode, htmlPluginState} from "./types";
import {ACCESSIBILITY_MODES} from './internalConstnats';

/**
 * Returns the accessibility plugin
 * @param mode 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind'
 */
export function accessibility(mode='darkmode'): plugin{
  return accessibilityPlugin.bind(null, mode);
}

/**
 * Accessibility transformations are appended to the original image.
 * @param mode Accessbility mode 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind'
 * @param element The image element
 * @param pluginCloudinaryImage
 * @param htmlPluginState holds cleanup callbacks and event subscriptions
 */
export function accessibilityPlugin(mode?: accessibilityMode, element?: HTMLImageElement, pluginCloudinaryImage?: CloudinaryImage, htmlPluginState?: htmlPluginState): Promise<void | string> | string {
  return new Promise((resolve) => {
    htmlPluginState.cleanupCallbacks.push(()=>{
      resolve('canceled');
    });

    if(!ACCESSIBILITY_MODES[mode]){
      mode = 'darkmode';
    }
    pluginCloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
    resolve();
  });
}
