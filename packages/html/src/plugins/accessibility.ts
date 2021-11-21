import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugin, AccessibilityMode, HtmlPluginState} from "../types";
import {ACCESSIBILITY_MODES} from '../utils/internalConstants';
import {isBrowser} from "../utils/isBrowser";
import {isImage} from "../utils/isImage";

/**
 * @namespace
 * @description Appends accessibility transformations to the original image.
 * @param mode {AccessibilityMode} The accessibility mode to use. Possible modes: 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind'. Default: 'darkmode'.
 * @return {Plugin}
 * @example
 * <AdvancedImage cldImg={img} plugins={[accessibility()]}/>
 */
export function accessibility(mode='darkmode'): Plugin{
  return accessibilityPlugin.bind(null, mode);
}

/**
 * @description Accessibility plugin
 * @param mode {accessibilityMode} The accessibility mode to use. Possible modes: 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind'. Default: 'darkmode'.
 * @param element {HTMLImageElement} The image element.
 * @param pluginCloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
 */
export function accessibilityPlugin(mode: AccessibilityMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: HtmlPluginState): Promise<void | string> {
  if(isBrowser()){

    if(!isImage(element)) return;

    return new Promise((resolve) => {
      // resolved promise when canceled
      htmlPluginState.cleanupCallbacks.push(()=>{
        resolve('canceled');
      });

      if(!ACCESSIBILITY_MODES[mode]){
        mode = 'darkmode';
      }
      pluginCloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
      resolve();
    });
  }else{
    pluginCloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
  }
}

