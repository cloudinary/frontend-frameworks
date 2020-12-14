import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
export function lazyload(element: HTMLImageElement, cloudinaryImage: CloudinaryImage, runningPlugins: Function[]): Promise<void | string> | string {
  return new Promise((resolve) => {
    runningPlugins.push(()=>{
      resolve('canceled');
    });
    const onIntersect = () => (resolve());
    detectIntersection(element, onIntersect);
  });
}

/**
 * Check if IntersectionObserver is supported
 * @return {boolean} true if window.IntersectionObserver is defined
 */
function isIntersectionObserverSupported() {
  // Check that 'IntersectionObserver' property is defined on window
  return typeof window === "object" && window.IntersectionObserver;
}

/**
 * Calls onIntersect() to resolve when intersection is detected, or when
 * no native lazy loading or when IntersectionObserver isn't supported.
 * @param {Element} el - the element to observe
 * @param {function} onIntersect - called when the given element is in view
 */
function detectIntersection(el: HTMLImageElement, onIntersect: Function) {
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
        }, {threshold: [0, 0.01]});
    observer.observe(el);
  } catch (e) {
    onIntersect();
  }
}
