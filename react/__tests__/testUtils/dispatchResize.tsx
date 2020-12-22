/**
 * Util function used to dispatch a resize event used in the responsive tests
 * @param component
 * @param resizeValue
 */
export function dispatchResize(component: any, resizeValue:number){
  const el = component.find('#wrapper').getDOMNode();
  Object.defineProperty(el, 'clientWidth', {value: resizeValue, configurable: true});
  window.dispatchEvent(new Event('resize'));

  return el;
}
