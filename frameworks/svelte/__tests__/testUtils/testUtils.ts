import { tick } from "svelte";
import { render, RenderResult } from '@testing-library/svelte'
import { testWithMockedIntersectionObserver } from '../../../../testUtils/setupIntersectionObserverMock';
import { SvelteComponentDev } from "svelte/internal";
import { CloudinaryImage } from "@cloudinary/base";
import { Plugins } from "@cloudinary/html";

/**
 * Get element from container
 * @param container
 * @param type
 */
const getElement = (container: HTMLElement, type: string): HTMLElement => container.querySelector(type) || {} as HTMLElement;

/**
 * Get img element from container
 * @param container
 */
const getImageElement = (container: HTMLElement): HTMLImageElement => getElement(container, 'img') as HTMLImageElement;

/**
 * Get element attribute from container
 * @param container
 * @param type
 * @param attr
 */
const getElementAttr = (container: HTMLElement, type: string, attr: string): any => ((getElement(container, type) || {}) as any)[attr];

/**
 * Get img attribute from container
 * @param container
 * @param attr
 */
const getImageAttr = (container: HTMLElement, attr: string): any => getElementAttr(container, 'img', attr);


/**
 * Mount given component on client side
 * @param cmp
 * @param props
 * @return render result
 */
const mount = async (cmp?: SvelteComponentDev | typeof SvelteComponentDev, props?: any): Promise<RenderResult> => {
  const result = cmp ? render(cmp as any, props) : {};
  await tick();
  return result as RenderResult;
};

/**
 * Mount given component on server side
 * @param cmp
 * @param props
 * @return render result
 */
const mountSSR = (cmp: SvelteComponentDev | typeof SvelteComponentDev, props?: {cldImg?: CloudinaryImage; plugins?: Plugins; }): string => {
  if (cmp) {
    return (cmp as SvelteComponentDev).render({...(props || {})}).html.trim();
  }
  return '';
};

/**
 * Dispatched a window resize event
 */
const dispatchResize = () => {
  window.dispatchEvent(new Event('resize'));
};

/**
 * Resize given element and dispatch a window resize event
 * @param element to resize
 * @param width to set element's clientWidth to
 */
const resizeElement = (element: HTMLElement, width?: number) => {
  Object.defineProperty(element, 'clientWidth', {value: width, configurable: true});
  dispatchResize();
};

/**
 * Resize given container and dispatch a resize event
 * @param container to resize
 * @param width to set element's clientWidth to
 */
const resizeContainer = (container: any, width?: number) => {
  resizeElement(getElement(container, '#wrapper'), width);
};

export {
  testWithMockedIntersectionObserver,
  getImageElement,
  getImageAttr,
  getElement,
  getElementAttr,
  mount,
  mountSSR,
  dispatchResize,
  resizeContainer
};