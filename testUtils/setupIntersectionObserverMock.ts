/**
 * Helper for mocking intersection observer
 * @param cb: callback that is called when an intersection occurs
 */
const testWithMockedIntersectionObserver = (cb: (...args:any) => void) => {
  let intersectCallback: (root?: Element, rootMargin?: string, thresholds?: number) => void = () => {}; // will be
  // populated later
  let nativeIntersectionObserver = global.IntersectionObserver;

  // Mock IntersectionObserver
  // @ts-ignore
  global.IntersectionObserver = class {
    constructor(cb: (root?: Element, rootMargin?: string, thresholds?: number) => any) {
      // This is the callback that notifies when an intersection occurs
      // We'll store it to use it later
      intersectCallback = cb;
    }
    observe() {}
    unobserve() {}
  };
  cb((root?: Element, rootMargin?: string, thresholds?: number) => {
    intersectCallback(root, rootMargin, thresholds);
  });

  // restore
  global.IntersectionObserver = nativeIntersectionObserver;
};

export {testWithMockedIntersectionObserver};
