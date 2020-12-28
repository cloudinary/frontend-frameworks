import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, accessibilityMode, htmlPluginState} from "./types";
import {ACCESSIBILITY_MODES} from './internalConstnats';

/**
 * @namespace
 * @description Accessibility transformations are appended to the original image.
 * @param mode {accessibilityMode} can be the following modes darkmode | brightmode | monochrome | colorblind
 * @return {plugin}
 * @example
 * <CldImg transformation={img} plugins={[accessibility()]}/>
 */
export function accessibility(mode='darkmode'): plugin{
  return accessibilityPlugin.bind(null, mode);
}

/**
 * @description Accessibility plugin
 * @param mode {accessibilityMode} can be the following modes darkmode | brightmode | monochrome | colorblind
 * @param element {HTMLImageElement} The image element
 * @param pluginCloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} holds cleanup callbacks and event subscriptions
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
