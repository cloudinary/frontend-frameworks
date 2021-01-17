import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, htmlPluginState} from "../types";
import {PLACEHOLDER_IMAGE_OPTIONS, emptyImage} from '../utils/internalConstnats';
import {placeholderMode} from '../types';
import {isBrowser} from "../utils/isBrowser";

/**
 * @namespace
 * @description Displays a placeholder image until the original image loads.
 * @param mode {placeholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @return plugin
 * @example
 * <CldImg transformation={img} plugins=[(placeholder('blur'))]/>
 */
export function placeholder(mode='vectorize'): plugin{
  return placeholderPlugin.bind(null, mode);
}

/**
 * @description Placeholder plugin
 * @param mode {placeholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @param element {HTMLImageElement} The image element.
 * @param pluginCloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
 */
function placeholderPlugin(mode: placeholderMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: htmlPluginState): Promise<void | string> | string  {
  if(!isBrowser()){
    return;
  }
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
 * @param mode {placeholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @param pluginCloudinaryImage {CloudinaryImage}
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
