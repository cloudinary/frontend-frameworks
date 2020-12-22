import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, runningPlugins} from "./types";
import {PLACEHOLDER_IMAGE_OPTIONS} from './internalConstnats';
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
function placeholderPlugin(mode?: placeholderMode, element?: HTMLImageElement, pluginCloudinaryImage?: CloudinaryImage, runningPlugins?: runningPlugins): Promise<void | string> | string  {
  const placeholderTransformation = preparePlaceholderTransformation(mode, pluginCloudinaryImage);
  element.src = placeholderTransformation.toURL();

  return new Promise((resolve: any) => {
    runningPlugins.holdCanceled.push(()=>{
      element.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
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
  const placeholderClonedImage = cloneDeep(pluginCloudinaryImage);

  if(!PLACEHOLDER_IMAGE_OPTIONS[mode]){
    mode = 'vectorize'
  }
  //appends a placeholder transformation on placeholderClonedImage
  PLACEHOLDER_IMAGE_OPTIONS[mode].actions.forEach(transformation => placeholderClonedImage.addAction(transformation));

  return placeholderClonedImage;
}
