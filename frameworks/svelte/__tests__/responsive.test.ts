import waitForExpect from 'wait-for-expect';
import { crop } from '@cloudinary/base/actions/resize';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {responsive} from '../src/index';
import {default as MockWrapper} from './testUtils/ResponsiveHelperWrapper.svelte';
import {getImageAttr, mount, getElement, dispatchResize, resizeContainer} from "./testUtils/testUtils";

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});

describe('responsive', () => {
  it('should apply initial container width (default 250)', async () => {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive()]}
    });

    await waitForExpect(() => {
      expect(getElement(container, '#wrapper').clientWidth).toBe(250);
    });
  });

  it('should update container width on window resize', async () => {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive()]}
    });

    resizeContainer(container, 100);

    await waitForExpect(() => {
      expect(getElement(container, '#wrapper').clientWidth).toBe(100);
    });
  });

  it('should step by the 100th', async function () {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive(100)]}
    });

    dispatchResize();

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample');
    });
  });

  it('should step by breakpoints', async function () {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive([800, 1000, 1200, 3000])]}
    });

    dispatchResize();

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample');
    });

    // simulate resize to 975
    resizeContainer(container, 975);

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample');
    });
  });

  it('should not resize to larger than provided breakpoints', async function () {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive([800, 1000, 1200, 3000])]}
    });

    resizeContainer(container, 4000);

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample');
    });
  });

  it('should handle unordered breakpoints', async function () {
    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive([1000, 800, 3000, 1200])]}
    });

    resizeContainer(container, 5000);

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample');
    });
  });

  it('should append to existing transformation', async function () {
    cloudinaryImage.resize(crop('500'));

    const {container} = await mount(MockWrapper, {
      cldImg: cloudinaryImage,
      advancedImgProps: {plugins: [responsive()]}
    });

    dispatchResize();

    await waitForExpect(() => {
      expect(getImageAttr(container, 'src')).toBe('https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample');
    });
  });
});
