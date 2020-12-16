import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin} from './types'

export function lazyload(rootMargin?: string, threshold?: number | number[]): plugin{
  return plugin.bind(null, rootMargin, threshold);
}

function plugin(rootMargin='0px', threshold=0.1 , element?: HTMLImageElement, cloudinaryImage?: CloudinaryImage, runningPlugins?: Function[]): Promise<void | string> | string {
  return new Promise((resolve) => {
    const onIntersect = () => (resolve());
    const unobserve = detectIntersection(element, onIntersect, rootMargin, threshold);

    runningPlugins.push(()=>{
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
 * @param onCancel
 * @param rootMargin
 * @param threshold
 */
function detectIntersection(el: HTMLImageElement, onIntersect: Function, rootMargin?: string, threshold?: number | number[]) {
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
