export function dispatchResize(component: any, resizeValue:number){
  const el = component.find('#wrapper').getDOMNode();
  Object.defineProperty(el, 'clientWidth', {value: resizeValue, configurable: true});
  window.dispatchEvent(new Event('resize'));

  return el;
}
