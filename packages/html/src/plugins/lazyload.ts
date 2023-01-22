import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugin, HtmlPluginState, PluginResponse} from '../types.js'
import {isBrowser} from "../utils/isBrowser.js";

/**
 * @namespace
 * @description Loads an image once it is in a certain margin in the viewport. This includes vertical and horizontal scrolling.
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
 * @return {Plugin}
 * @example
 * <caption>
 * NOTE: The following is in React. For further examples, see the Packages tab.
 * When using the plugin make sure to add dimensions, otherwise the images will load with
 * the size of 0x0, meaning the images will be in the viewport and trigger the lazyload plugin.
 * </caption>
 * <AdvancedImage style={{width: "400px", height: "400px"}}  cldImg={img} plugins={[lazyload({rootMargin: '0px',
 * threshold: 0.25})]} />
 */
export function lazyload({rootMargin='0px', threshold=0.1}:{rootMargin?: string, threshold?: number}={}): Plugin{
  return lazyloadPlugin.bind(null, rootMargin, threshold);
}
/**
 * @description lazyload plugin
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
 * @param element The image element.
 * @param element {HTMLImageElement} The image element.
 * @param cloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {HtmlPluginState} Holds cleanup callbacks and event subscriptions.
 */
function lazyloadPlugin(rootMargin='0px', threshold=0.1 , element: HTMLImageElement | HTMLVideoElement, cloudinaryImage: CloudinaryImage, htmlPluginState: HtmlPluginState): Promise<PluginResponse> | boolean {
  // if SSR skip plugin
  if(!isBrowser()) return false;

  return new Promise((resolve) => {
    const onIntersect = () => (resolve({lazyload: true}));
    const unobserve = detectIntersection(element, onIntersect, rootMargin, threshold);

    htmlPluginState.cleanupCallbacks.push(()=>{
      unobserve();
      resolve('canceled');
    });
  });
}

/**
 * Check if IntersectionObserver is supported
 * @return {boolean} true if window.IntersectionObserver is defined
 */
function isIntersectionObserverSupported() {
  // Check that 'IntersectionObserver' property is defined on window
  return window && 'IntersectionObserver' in window;
}

/**
 * Calls onIntersect() to resolve when intersection is detected, or when
 * no native lazy loading or when IntersectionObserver isn't supported.
 * @param {Element} el - the element to observe
 * @param {function} onIntersect - called when the given element is in view
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
 */
function detectIntersection(el: HTMLImageElement | HTMLVideoElement, onIntersect: Function, rootMargin: string, threshold: number | number[]) {
  try {
    if (!isIntersectionObserverSupported()) {
      // Return if there's no need or possibility to detect intersection
      onIntersect();
      return;
    }
    // Detect intersection with given element using IntersectionObserver
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              onIntersect();
            }
          });
        }, {rootMargin: rootMargin, threshold: threshold});
    observer.observe(el);

    return ()=>{el && observer.observe(el)};
  } catch (e) {
    onIntersect();
  }
}
