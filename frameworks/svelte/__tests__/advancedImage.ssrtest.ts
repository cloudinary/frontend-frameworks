require('svelte/register');
import waitForExpect from 'wait-for-expect';
import {AdvancedImage, accessibility, placeholder, responsive, lazyload} from "../src/index";
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {mountSSR} from "./testUtils/testUtils";

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});

/**
 * Test server side rendering:
 * The .ssrtest extension is used for this file to separate ssr tests from the rest of the unit tests.
 * This is because ssr requires different svelte compiler configuration that is defined in
 * a different jest configuration file (jest-ssr.config.json)
 */
describe('ssr', () => {
  it('should render accessibility transformation with accessibility', async () => {
    const result = mountSSR(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility()]});

    await waitForExpect(() => {
      expect(result.trim()).toBe(`<img src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample">`);
    });
  });


  it('should render original image with placeholder', async () => {
    const result = mountSSR(AdvancedImage, {cldImg: cloudinaryImage, plugins: [placeholder()]});

    await waitForExpect(() => {
      expect(result.trim()).toBe(`<img src="https://res.cloudinary.com/demo/image/upload/sample">`);
    });
  });

  it('should render original image when responsive', async () => {
    const result = mountSSR(AdvancedImage, {cldImg: cloudinaryImage, plugins: [responsive()]});

    await waitForExpect(() => {
      expect(result.trim()).toBe(`<img src="https://res.cloudinary.com/demo/image/upload/sample">`);
    });
  });

  it('should render original image when lazy loaded', async () => {
    const result = mountSSR(AdvancedImage, {cldImg: cloudinaryImage, plugins: [lazyload()]});

    await waitForExpect(() => {
      expect(result.trim()).toBe(`<img src="https://res.cloudinary.com/demo/image/upload/sample">`);
    });
  });
});
