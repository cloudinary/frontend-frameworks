import {tick} from "svelte";
import {render, RenderResult} from '@testing-library/svelte'
import {testWithMockedIntersectionObserver} from '../../../../testUtils/setupIntersectionObserverMock';
import type {SvelteComponentDev} from "svelte/internal";

const getElement = (container: HTMLElement, type: string): HTMLElement => container.querySelector(type) || {} as HTMLElement;

const getImageElement = (container: HTMLElement): HTMLImageElement => getElement(container, 'img') as HTMLImageElement;

const getImageAttr = (container: HTMLElement, attr: string): any => ((getImageElement(container) || {}) as any)[attr];

const getElementAttr = (container: HTMLElement, type: string, attr: string): any => ((getElement(container, type) || {}) as any)[attr];

const mount = async (cmp?: typeof SvelteComponentDev, props?: any): Promise<RenderResult> => {
  const result = cmp ? render(cmp, props) : {};
  await tick();
  return result as RenderResult;
};

/**
 * Resize given element and dispatch a window resize event
 * @param element to resize
 * @param width to set element's clientWidth to
 * @return the modified element
 */
const resizeElement = (element?: any, width?: number) => {
  if (element) {
    Object.defineProperty(element, 'clientWidth', {value: width, configurable: true});
  }
  window.dispatchEvent(new Event('resize'));

  return element;
}

/**
 * Util function used to dispatch a resize event used in the responsive tests
 * Resize #wrapper in given svelte container to given width and dispatch a window resize event.
 * @param container
 * @param width
 * @return the modified element
 */
const dispatchResize = (container?: any, width?: number) => {
  if (container) {
    return resizeElement(getElement(container, '#wrapper'), width);
  }

  return resizeElement();
}


export {
  testWithMockedIntersectionObserver,
  getImageElement,
  getImageAttr,
  getElement,
  getElementAttr,
  mount,
  dispatchResize
};