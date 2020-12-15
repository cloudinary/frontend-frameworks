// @ts-ignore
function testWithMockedIntersectionObserver(cb) {
  let intersectCallback = () => {}; // will be populated later
  let nativeIntersectionObserver = global.IntersectionObserver;

  // Mock IntersectionObserver
  // @ts-ignore
  global.IntersectionObserver = class {
    // @ts-ignore
    constructor(cb) {
      // This is the callback that notifies when an intersection occurs
      // We'll store it to use it later
      intersectCallback = cb;
    }
    observe() {}
    unobserve() {}
  };
  // @ts-ignore
  cb((...args) => {
    // @ts-ignore
    intersectCallback(...args);
  });

  // restore
  global.IntersectionObserver = nativeIntersectionObserver;
}

export default testWithMockedIntersectionObserver;
