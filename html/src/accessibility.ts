import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, accessibilityMode, htmlPluginState} from "./types";
import {ACCESSIBILITY_MODES} from './internalConstnats';

/**
 * @namespace
 * @description Accessibility transformations are appended to the original image.
 * @param mode {accessibilityMode} Accessibility mode darkmode | brightmode | monochrome | colorblind
 * @return {plugin}
 * @example
 * plugins=[(accessibility())]
 */
export function accessibility(mode='darkmode'): plugin{
  return accessibilityPlugin.bind(null, mode);
}

/**
 * @description Accessibility plugin
 * @param mode {accessibilityMode} Accessibility mode darkmode | brightmode | monochrome | colorblind
 * @param element The image element
 * @param pluginCloudinaryImage
 * @param htmlPluginState holds cleanup callbacks and event subscriptions
 */
export function accessibilityPlugin(mode: accessibilityMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: htmlPluginState): Promise<void | string> | string {
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
