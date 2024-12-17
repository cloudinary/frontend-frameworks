const OVERSIZE_IMAGE_TOLERANCE = 500

let performanceObserver: PerformanceObserver

export const warnOnOversizedImage = (image: HTMLImageElement) => {
  const { clientWidth, clientHeight, naturalWidth, naturalHeight } = image
  if (
    naturalWidth > clientWidth + OVERSIZE_IMAGE_TOLERANCE ||
    naturalHeight > clientHeight + OVERSIZE_IMAGE_TOLERANCE
  ) {
    console.warn(
      `An image with URL ${image.src} has dimensions significantly smaller than intrinsic size, ` +
        `and may slow down page load. You may address this by supplying a height and width for the image, ` +
        `or by using the responsive image plugin. ` +
        `Rendered size: ${clientWidth}x${clientHeight}. Intrinsic size: ${naturalWidth}x${naturalHeight}. ` +
        `This warning can be surpressed by adding the 'silence-warnings' attribute to AdvancedImage.`
    )
  }
}

export const warnOnLazyLCP = (imgRef: HTMLImageElement) => {
  if (
    !performanceObserver &&
    typeof window !== 'undefined' &&
    window.PerformanceObserver
  ) {
    performanceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      if (entries.length === 0) {
        return
      }

      // The final LCP entry is the only one that can be the real LCP element. This cast is safe because
      // this performanceObserver callback only listens for largest-contentful-paint events.
      const lcpCandidate = entries[entries.length - 1] as LargestContentfulPaint

      if (lcpCandidate.element?.getAttribute('loading') === 'lazy') {
        console.warn(
          `An image with URL ${imgRef.src} has ' loading="lazy"' and has also been detected to be a possible ` +
            `LCP element (https://web.dev/lcp). This can have a significant negative impact on page loading performance. ` +
            `To fix this issue, remove, 'loading="lazy"' from images which may render in the initial viewport. ` +
            `This warning can be surpressed by adding the 'silence-warnings' attribute to AdvancedImage.`
        )
      }
    })
    performanceObserver.observe({
      type: 'largest-contentful-paint',
      buffered: true
    })
  }
}
