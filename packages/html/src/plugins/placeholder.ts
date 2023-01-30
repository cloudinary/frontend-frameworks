import cloneDeep from 'lodash.clonedeep'
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugin, HtmlPluginState, AnalyticsOptions, PluginResponse} from "../types";
import {PLACEHOLDER_IMAGE_OPTIONS, singleTransparentPixel} from '../utils/internalConstants';
import {PlaceholderMode} from '../types';
import {isBrowser} from "../utils/isBrowser";
import {Action} from "@cloudinary/url-gen/internal/Action";
import {isImage} from "../utils/isImage";
import {getAnalyticsOptions} from "../utils/analytics";

/**
 * @namespace
 * @description Displays a placeholder image until the original image loads.
 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @return {Plugin}
 * @example <caption>NOTE: The following is in React. For further examples, see the Packages tab.</caption>
 * <AdvancedImage cldImg={img} plugins={[placeholder({mode: 'blur'})]} />
 */
export function placeholder({mode='vectorize'}:{mode?: string}={}): Plugin{
  return placeholderPlugin.bind(null, mode);
}

/**
 * @description Placeholder plugin
 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
 * @param element {HTMLImageElement} The image element.
 * @param pluginCloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
 * @param analyticsOptions {AnalyticsOptions} analytics options for the url to be created
 */
function placeholderPlugin(mode: PlaceholderMode, element: HTMLImageElement, pluginCloudinaryImage: CloudinaryImage, htmlPluginState: HtmlPluginState, analyticsOptions?: AnalyticsOptions): Promise<PluginResponse> | boolean {
  // @ts-ignore
  // If we're using an invalid mode, we default to vectorize
  if(!PLACEHOLDER_IMAGE_OPTIONS[mode]){
    mode = 'vectorize'
  }

  // A placeholder mode maps to an array of transformations
  const PLACEHOLDER_ACTIONS = PLACEHOLDER_IMAGE_OPTIONS[mode].actions;

  // Before proceeding, clone the original image
  // We clone because we don't want to pollute the state of the image
  // Future renders (after the placeholder is loaded) should not load placeholder transformations
  const placeholderClonedImage = cloneDeep(pluginCloudinaryImage);

  //appends a placeholder transformation on the clone
  // @ts-ignore
  PLACEHOLDER_ACTIONS.forEach(function(transformation:Action){
    placeholderClonedImage.addAction(transformation);
  });

  if(!isBrowser()) {
    // in SSR, we copy the transformations of the clone to the user provided CloudinaryImage
    // We return here, since we don't have HTML elements to work with.
    pluginCloudinaryImage.transformation = placeholderClonedImage.transformation;

    return true;
  }

  // Client side rendering, if an image was not provided we don't perform any action
  if(!isImage(element)) return;

  // For the cloned placeholder image, we remove the responsive action.
  // There's no need to load e_pixelate,w_{responsive} beacuse that image is temporary as-is
  // and it just causes another image to load.

  // This also means that the de-facto way to use responsive in SSR is WITH placeholder.
  // This also means that the user must provide dimensions for the responsive plugin on the img tag.
  placeholderClonedImage.transformation.actions.forEach((action, index) => {
    if (action instanceof Action && action.getActionTag() === 'responsive') {
      delete placeholderClonedImage.transformation.actions[index];
    }
  });

  const featuredAnalyticsOptions = getAnalyticsOptions(analyticsOptions, {placeholder: true});

  // Set the SRC of the imageElement to the URL of the placeholder Image
  element.src = placeholderClonedImage.toURL(featuredAnalyticsOptions);

  //Fallback, if placeholder errors, load a single transparent pixel
  element.onerror = () => {
    element.src = singleTransparentPixel;
  };

  /*
   * This plugin loads two images:
   * - The first image is loaded as a placeholder
   * - The second image is loaded after the placeholder is loaded
   *
   * Placeholder image loads first. Once it loads, the promise is resolved and the
   * larger image will load. Once the larger image loads, promised and plugin is resolved.
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
      largeImage.src = pluginCloudinaryImage.toURL(featuredAnalyticsOptions);
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
