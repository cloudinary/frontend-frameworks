import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, accessibilityMode} from "./types";
import {ACCESSIBILITY_MODES} from './constants';

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
 * @param cloudinaryImage
 * @param runningPlugins holds running plugins to be canceled
 */
export function accessibilityPlugin(mode?: accessibilityMode, element?: HTMLImageElement, cloudinaryImage?: CloudinaryImage, runningPlugins?: Function[]): Promise<void | string> | string {
  return new Promise((resolve) => {
    runningPlugins.push(()=>{
      resolve('canceled');
    });
    cloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
    resolve();
  });
}
