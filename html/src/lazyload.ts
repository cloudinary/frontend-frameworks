import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin, htmlPluginState} from './types'

/**
 * @namespace
 * @description Image loads once it is in a certain margin in the viewport. This includes vertical and horizontal scrolling.
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed defaults to 0px
 * @param threshold {number} A number which indicate at what percentage of the images's visibility the image should
 * load. The default is 0.1 which indicated 100%
 * @return {plugin}
 * @example
 * <CldImg transformation={img} plugins=[(lazyload('0px', 0.25))]/>
 */
export function lazyload(rootMargin?: string, threshold?: number): plugin{
  return lazyloadPlugin.bind(null, rootMargin, threshold);
}

/**
 * @description lazyload plugin
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed defaults to 0px
 * @param threshold {number} A number which indicate at what percentage of the images's visibility the image should
 * load. The default is 0.1 which indicated 100% * @param element The image element
 * @param element {HTMLImageElement} The image element
 * @param cloudinaryImage {CloudinaryImage}
 * @param htmlPluginState {htmlPluginState} holds cleanup callbacks and event subscriptions
 */
function lazyloadPlugin(rootMargin='0px', threshold=0.1 , element: HTMLImageElement, cloudinaryImage: CloudinaryImage, htmlPluginState: htmlPluginState): Promise<void | string> | string {
  return new Promise((resolve) => {
    const onIntersect = () => (resolve());
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
 * @param rootMargin {string} The root element's bounding box before the intersection test is performed defaults to 0px
 * @param threshold {number} A number which indicate at what percentage of the images's visibility the image should
 */
function detectIntersection(el: HTMLImageElement, onIntersect: Function, rootMargin: string, threshold: number | number[]) {
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
