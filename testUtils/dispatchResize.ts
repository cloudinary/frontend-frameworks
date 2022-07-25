/**
 * Util function used to dispatch a resize event used in the react responsive tests
 * @param component
 * @param resizeValue
 */
export function reactDispatchResize(component: any, resizeValue:number){
  const el = component.find('#wrapper').getDOMNode();
  return dispatchResize(el, resizeValue);
}

/**
 * Util function used to dispatch a resize event used in the responsive tests
 * @param component
 * @param resizeValue
 */
export function dispatchResize(component: HTMLDivElement, resizeValue:number){
  Object.defineProperty(component, 'clientWidth', {value: resizeValue, configurable: true});
  window.dispatchEvent(new Event('resize'));

  return component;
}
