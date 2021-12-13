import cloneDeep from 'lodash/cloneDeep'
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugin, HtmlPluginState} from "../types";
import {PLACEHOLDER_IMAGE_OPTIONS, singleTransparentPixel} from '../utils/internalConstants';
import {PlaceholderMode} from '../types';
import {isBrowser} from "../utils/isBrowser";
import {Action} from "@cloudinary/url-gen/internal/Action";
import {isImage} from "../utils/isImage";

/**
 * @namespace
 * @description Displays a placeholder image until the original image loads.
 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @return {Plugin}
 * @example <caption>NOTE: The following is in React. For further examples, please see the packages tab</caption>
 * <AdvancedImage cldImg={img} plugins=[(placeholder('blur'))]/>
 */
export function placeholder(mode='vectorize'): Plugin{
  return placeholderPlugin.bind(null, mode);
}

/**
 * @description Placeholder plugin
 * @param mode {placeholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @param element {HTMLImageElement} The image element.
 * @param pluginCloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
 */
function placeholderPlugin(mode: PlaceholderMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: HtmlPluginState): Promise<void | string> {
  if(!isBrowser())  return;

  if(!isImage(element)) return;

  const placeholderTransformation = preparePlaceholderTransformation(mode, pluginCloudinaryImage);

  element.src = placeholderTransformation.toURL();

  //if placeholder does not load, load a single transparent pixel
  element.onerror = () => {
    element.src = singleTransparentPixel;
  };

  /*
  Placeholder image loads first. Once it loads, the promise is resolved and the
  larger image will load. Once the larger image loads, promised and plugin is resolved.
   */
  return new Promise((resolve: any) => {
    element.onload = () => {
      resolve();
    };
  }).then(()=>{
    return new Promise((resolve: any) => {
      htmlPluginState.cleanupCallbacks.push(()=>{
        element.src = singleTransparentPixel;
        resolve('canceled');
      });
      // load image once placeholder is done loading
      const largeImage = new Image();
      largeImage.src = pluginCloudinaryImage.toURL();
      largeImage.onload = () => {
        resolve();
      };

      // image does not load, resolve
      largeImage.onerror = () => {
        resolve();
      };
    });
  });
}

/**
 * Prepares placeholder transformation by appending a placeholder-type transformation to the end of the URL
 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @param pluginCloudinaryImage {CloudinaryImage}
 */
function preparePlaceholderTransformation(mode: PlaceholderMode, pluginCloudinaryImage: CloudinaryImage){
  const placeholderClonedImage = cloneDeep(pluginCloudinaryImage);


  // @ts-ignore
  if(!PLACEHOLDER_IMAGE_OPTIONS[mode]){
    mode = 'vectorize'
  }
  //appends a placeholder transformation on placeholderClonedImage
  // @ts-ignore
  PLACEHOLDER_IMAGE_OPTIONS[mode].actions.forEach(function(transformation:Action){
    placeholderClonedImage.addAction(transformation);
  });

  return placeholderClonedImage;
}
