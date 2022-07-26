/**
 * Util function used to dispatch a resize event used in the responsive tests
 * @param component
 * @param resizeValue
 */
export function dispatchResize(component: HTMLDivElement, resizeValue?: number){
  if (resizeValue) {
    Object.defineProperty(component, 'clientWidth', {value: resizeValue, configurable: true});
  }
  window.dispatchEvent(new Event('resize'));

  return component;
}
