import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugin, HtmlPluginState, BaseAnalyticsOptions, AnalyticsOptions, PluginResponse} from "../types";
import {scale} from "@cloudinary/url-gen/actions/resize";
import debounce from 'lodash.debounce';
import {isNum} from '../utils/isNum';
import {isBrowser} from "../utils/isBrowser";
import {Action} from "@cloudinary/url-gen/internal/Action";
import {isImage} from "../utils/isImage";
import {getAnalyticsOptions} from '../utils/analytics'

/**
 * @namespace
 * @description Updates the src with the size of the parent element and triggers a resize event for
 * subsequent resizing.
 * @param steps {number | number[]} The step size in pixels or an array of image widths in pixels.
 * @return {Plugin}
 * @example <caption>NOTE: The following is in React. For further examples, see the Packages tab.</caption>
 * <AdvancedImage cldImg={img} plugins={[responsive({steps: [800, 1000, 1400]})]} />
 */
export function responsive({steps}:{steps?: number | number[]}={}): Plugin{
  return responsivePlugin.bind(null, steps);
}

/**
 * @description Responsive plugin
 * @param steps {number | number[]} The step size in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 * @param htmlPluginState {HtmlPluginState} holds cleanup callbacks and event subscriptions
 * @param analyticsOptions {BaseAnalyticsOptions} analytics options for the url to be created
 */
function responsivePlugin(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage, htmlPluginState?: HtmlPluginState, analyticsOptions?: BaseAnalyticsOptions): Promise<PluginResponse> | boolean {

  if(!isBrowser()) return true;

  if(!isImage(element)) return;

  return new Promise((resolve)=>{
    htmlPluginState.cleanupCallbacks.push(()=>{
      window.removeEventListener("resize", resizeRef);
      resolve('canceled');
    });

    const featuredAnalyticsOptions = getAnalyticsOptions(analyticsOptions, {responsive: true});

    // Use a tagged generic action that can be later searched and replaced.
    responsiveImage.addAction(new Action().setActionTag('responsive'));
    // Immediately run the resize plugin, ensuring that first render gets a responsive image.
    onResize(steps, element, responsiveImage, featuredAnalyticsOptions);

    let resizeRef: any;
    htmlPluginState.pluginEventSubscription.push(()=>{
      window.addEventListener('resize', resizeRef = debounce(()=>{
        onResize(steps, element, responsiveImage, featuredAnalyticsOptions);
      }, 100));
    });
    resolve({responsive: true});
  });
}

/**
 * On resize updates image src
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 * @param featuredAnalyticsOptions {AnalyticsOptions} analytics options for the url to be created
 */
function onResize(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage, featuredAnalyticsOptions?: AnalyticsOptions){
  updateByContainerWidth(steps, element, responsiveImage);
  element.src = responsiveImage.toURL(featuredAnalyticsOptions);
}

/**
 * Updates the responsiveImage by container width.
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 */
function updateByContainerWidth(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage){
  // Default value for responsiveImgWidth, used when no steps are passed.
  let responsiveImgWidth = element.parentElement.clientWidth;

  if(isNum(steps)){
    const WIDTH_INTERVALS = steps as number;
    // We need to force the container width to be intervals of max width.
    responsiveImgWidth = Math.ceil(responsiveImgWidth / WIDTH_INTERVALS ) * WIDTH_INTERVALS;

  } else if(Array.isArray(steps)){
    responsiveImgWidth = steps.reduce((prev, curr) =>{
      return (Math.abs(curr - responsiveImgWidth) < Math.abs(prev - responsiveImgWidth) ? curr : prev);
    });
  }

  responsiveImage.transformation.actions.forEach((action, index) => {
    if (action instanceof Action && action.getActionTag() === 'responsive') {
      responsiveImage.transformation.actions[index]  = scale(responsiveImgWidth).setActionTag('responsive');
    }
  });
}

