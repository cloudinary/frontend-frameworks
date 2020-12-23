import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, htmlPluginState} from "./types";
import {PLACEHOLDER_IMAGE_OPTIONS, emptyImage} from './internalConstnats';
import {placeholderMode} from './types';

/**
 * @namespace
 * @description Returns the placeholder plugin
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
 * @param htmlPluginState holds cleanup callbacks and event subscriptions
 */
function placeholderPlugin(mode: placeholderMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: htmlPluginState): Promise<void | string> | string  {
  const placeholderTransformation = preparePlaceholderTransformation(mode, pluginCloudinaryImage);
  element.src = placeholderTransformation.toURL();

  return new Promise((resolve: any) => {
    htmlPluginState.cleanupCallbacks.push(()=>{
      element.src = emptyImage;
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
function preparePlaceholderTransformation(mode: placeholderMode, pluginCloudinaryImage: CloudinaryImage){
  const placeholderClonedImage = cloneDeep(pluginCloudinaryImage);

  if(!PLACEHOLDER_IMAGE_OPTIONS[mode]){
    mode = 'vectorize'
  }
  //appends a placeholder transformation on placeholderClonedImage
  PLACEHOLDER_IMAGE_OPTIONS[mode].actions.forEach(transformation => placeholderClonedImage.addAction(transformation));

  return placeholderClonedImage;
}
