import {tick} from "svelte";
import {render, RenderResult} from '@testing-library/svelte'
import {testWithMockedIntersectionObserver} from '../../../../testUtils/setupIntersectionObserverMock';
import type {SvelteComponentDev} from "svelte/internal";

const getImageElement = (container: HTMLElement): HTMLImageElement => container.querySelector("img") || {} as HTMLImageElement;

const getImageAttr = (container: HTMLElement, attr: string): any => ((getImageElement(container) || {}) as any)[attr];

const mount = async (cmp?: typeof SvelteComponentDev, props?: any): Promise<RenderResult> => {
  const result = cmp ? render(cmp, props) : {};
  await tick();
  return result as RenderResult;
};

export {testWithMockedIntersectionObserver, getImageElement, getImageAttr, mount};