import {default as MockWrapper} from './testUtils/LazyLoadMockWrapper.svelte';
import {AdvancedImage, lazyload} from '../src/index';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {getImageAttr, mount, testWithMockedIntersectionObserver} from "./testUtils/testUtils";
import waitForExpect from 'wait-for-expect';

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'}, { analytics: false });


// Mock the intersectionObserver
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({observe: jest.fn(), unobserve: jest.fn()}));

describe('lazy-load', () => {
  it('should not have src pre-scroll', async () => {
    const {container} = await mount(MockWrapper);

    // no src pre scroll
    // @ts-ignore
    expect(container.querySelector('div').outerHTML).toBe(`<div><div style="height: 1000px;"></div> <img></div>`);
  });

  it('should have src when in view', async () => {
    testWithMockedIntersectionObserver(async (mockIntersectionEvent: ({}) => void) => {
      const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [lazyload()]});
      mockIntersectionEvent([{ isIntersecting: true, target: container.firstChild }]);
      await waitForExpect(() => {
        expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/sample');
      });
    });
  });

  it('should set lazyload root margin and threshold', async () => {
    testWithMockedIntersectionObserver(async (mockIntersectionEvent: ({}) => void) => {
      const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [lazyload('10px', 0.5)]});
      mockIntersectionEvent([{ isIntersecting: true, target: container.firstChild }]);
      await waitForExpect(() => {
        expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/sample');
      });
    });
  });

  it('should set lazyload root margin and threshold', async () => {
    testWithMockedIntersectionObserver(async (mockIntersectionEvent: ({}) => void) => {
      const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [lazyload('10px', 0.5)]});
      mockIntersectionEvent([{ isIntersecting: false, target: container.firstChild }]);
      await waitForExpect(() => {
        expect(getImageAttr(container, 'src')).toBeUndefined();
      });
    });
  });
});
