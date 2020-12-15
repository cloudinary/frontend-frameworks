import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, accessibilityMode} from "./types";
import {ACCESSIBILITY_MODES} from './constants';

export function accessibility(mode?: string): plugin{
  return accessibilityPlugin.bind(null, mode);
}

export function accessibilityPlugin(mode: accessibilityMode="darkmode", element?: HTMLImageElement, cloudinaryImage?: CloudinaryImage, runningPlugins?: Function[]): Promise<void | string> | string {
  return new Promise((resolve) => {
    runningPlugins.push(()=>{
      resolve('canceled');
    });
    cloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
    resolve();
  });
}
