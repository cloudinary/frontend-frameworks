export const testWithMockedIntersectionObserver = (
  cb: (...args: any) => void
) => {
  let intersectCallback: (
    root?: Element,
    rootMargin?: string,
    thresholds?: number
  ) => void = () => {}; // will be
  // populated later
  const nativeIntersectionObserver = global.IntersectionObserver;

  // Mock IntersectionObserver
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.IntersectionObserver = class {
    constructor(
      cb: (root?: Element, rootMargin?: string, thresholds?: number) => any
    ) {
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
