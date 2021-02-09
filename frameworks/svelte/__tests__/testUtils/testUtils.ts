import {SvelteComponent, tick} from "svelte";
import {render, RenderResult} from '@testing-library/svelte'
import {testWithMockedIntersectionObserver} from '../../../../testUtils/setupIntersectionObserverMock';

const getImageElement = (container: HTMLElement): HTMLImageElement => container.querySelector("img");

const getImageAttr = (container: HTMLElement, attr: string): any => (getImageElement(container) || {})[attr];

const mount = async (cmp?: typeof SvelteComponent, props?: any): Promise<RenderResult> => {
  const result = render(cmp, props);
  await tick();
  return result;
};

export {testWithMockedIntersectionObserver, getImageElement, getImageAttr, mount};