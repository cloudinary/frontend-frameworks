import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, htmlPluginState} from "../types";
import {scale} from "@cloudinary/base/actions/resize";
import debounce from 'lodash.debounce';
import {isNum} from '../utils/internalUtils';
import {isBrowser} from "../utils/isBrowser";
import {Action} from "@cloudinary/base/internal/Action";
import {isImage} from "../utils/isImage";

/**
 * @namespace
 * @description Updates the src with the size of the parent element and triggers a resize event for
 * subsequent resizing.
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @return plugin
 * @example
 * <AdvancedImage cldImg={img} plugins=[(responsive(100))] plugins=[(responsive([800, 1000, 1400]))] />
 */
export function responsive(steps?: number | number[]): plugin{
  return responsivePlugin.bind(null, steps);
}

/**
 * @description Responsive plugin
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} holds cleanup callbacks and event subscriptions
 */
function responsivePlugin(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage, htmlPluginState?: htmlPluginState): Promise<void | string> {
  if(!isBrowser()) return;

  if(!isImage(element)) return;

  return new Promise((resolve)=>{
    htmlPluginState.cleanupCallbacks.push(()=>{
      window.removeEventListener("resize", resizeRef);
      resolve('canceled');
    });

    const containerSize = element.parentElement.clientWidth;
    responsiveImage.resize(scale().width(containerSize).setActionTag('responsive'));

    let resizeRef: any;
    htmlPluginState.pluginEventSubscription.push(()=>{
      window.addEventListener('resize', resizeRef = debounce(()=>{
        onResize(steps, element, responsiveImage);
      }, 100));
    });
    resolve();
  });
}

/**
 * On resize updates image src
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 */
function onResize(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage){
  updateByContainerWidth(steps, element, responsiveImage);
  element.src = responsiveImage.toURL();
}

/**
 * Updates the responsiveImage by container width.
 * @param steps {number | number[]} The step size in pixels.
 * | number[] A set of image sizes in pixels.
 * @param element {HTMLImageElement} The image element
 * @param responsiveImage {CloudinaryImage}
 */
function updateByContainerWidth(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage){
  let resizeValue = element.parentElement.clientWidth;

  if(isNum(steps)){
    resizeValue = Math.ceil(resizeValue/<number>steps)*<number>steps;
  } else if(Array.isArray(steps)){
    resizeValue = steps.reduce((prev, curr) =>{
      return (Math.abs(curr - resizeValue) < Math.abs(prev - resizeValue) ? curr : prev);
    });
  }

  responsiveImage.transformation.actions.forEach((action, index) => {
    if (action instanceof Action && action.getActionTag() === 'responsive') {
      responsiveImage.transformation.actions[index]  = scale(resizeValue).setActionTag('responsive');
    }
  });
}

