import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, htmlPluginState} from "./types";
import {scale} from "@cloudinary/base/actions/resize";
import debounce from 'lodash.debounce';
import {isNum} from './utils/internalUtils';

/**
 * @namespace
 * @description Returns the responsive plugin
 * @param steps The size step used to update responsive image number
 * | number[] The set of values to be used when resizing the browser window and a larger image needs to be delivered
 */
export function responsive(steps?: number | number[]): plugin{
  return responsivePlugin.bind(null, steps);
}

/**
 * @description Updates the src with size of the parent Element and triggers a resize event for
 * subsequent resizing
 * @param steps steps The size step used to update responsive image number | number[]
 * @param element HTMLImageElement The image element
 * @param responsiveImage
 * @param htmlPluginState holds cleanup callbacks and event subscriptions
 */
function responsivePlugin(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage, htmlPluginState?: htmlPluginState): Promise<void | string> | string {
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
 * @param steps
 * @param element
 * @param responsiveImage
 */
function onResize(steps?: number | number[], element?:HTMLImageElement, responsiveImage?: CloudinaryImage){
  updateByContainerWidth(steps, element, responsiveImage);
  element.src = responsiveImage.toURL();
}

/**
 * Updates the responsiveImage by container width.
 * @param steps The size step used to update responsive image number | number[]
 * @param element HTMLImageElement The image element
 * @param responsiveImage
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
    if (action.getActionTag() === 'responsive') {
      responsiveImage.transformation.actions[index]  = scale(resizeValue).setActionTag('responsive');
    }
  });
}

