import {tick} from "svelte";
import {render} from '@testing-library/svelte'
import {testWithMockedIntersectionObserver} from '../../../../testUtils/setupIntersectionObserverMock';


const getImageElement = (container: HTMLElement): any => container.querySelector("img");

const getImageAttr = (container: HTMLElement, attr: string): any => (getImageElement(container) || {})[attr];

const mount = async (cmp?: any, props?: any) => {
  const result = render(cmp, props);
  await tick();
  return result;
};

export {testWithMockedIntersectionObserver, getImageElement, getImageAttr, mount};