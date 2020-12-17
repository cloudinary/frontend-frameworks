import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin} from "./types";
import {PLACEHOLDER_IMAGE_OPTIONS} from './constants';
import {placeholderMode} from './types';

/**
 * Returns the placeholder plugin
 * @param mode Placeholder mode 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'
 */
export function placeholder(mode='vectorize'): plugin{
  return placeholderPlugin.bind(null, mode);
}

/**
 * Displays a placeholder image until the original image loads
 * @param mode Placeholder mode 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'
 * @param element HTMLImageElement The image element
 * @param pluginCloudinaryImage
 * @param runningPlugins holds running plugins to be canceled
 */
function placeholderPlugin(mode?: placeholderMode, element?: HTMLImageElement, pluginCloudinaryImage?: CloudinaryImage, runningPlugins?: Function[]): Promise<void | string> | string  {
  const placeholderTransformation = preparePlaceholderTransformation(mode, pluginCloudinaryImage);
  element.src = placeholderTransformation.toURL();

  return new Promise((resolve: any) => {
    runningPlugins.push(()=>{
      element.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;';
      resolve('canceled');
    });

    const largeImage = new Image();
    largeImage.src = pluginCloudinaryImage.toURL();
    largeImage.onload = () => {
      resolve();
    };
  });
}

/**
 * Prepares placeholder transformation by appending a placeholder-type transformation to the end of the URL
 * @param mode Placeholder mode 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'
 * @param pluginCloudinaryImage
 */
function preparePlaceholderTransformation(mode?: placeholderMode, pluginCloudinaryImage?: CloudinaryImage){
  const clone = cloneDeep(pluginCloudinaryImage);

  if(!PLACEHOLDER_IMAGE_OPTIONS[mode]){
    mode = 'vectorize'
  }
  PLACEHOLDER_IMAGE_OPTIONS[mode].actions.forEach(transformation => clone.addAction(transformation));

  return clone;
}
