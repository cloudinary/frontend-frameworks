import {AdvancedImage, accessibility} from '../src/index';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {getImageAttr, mount} from "./testUtils/testUtils";

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});

describe('accessibility', () => {
  it('should apply default', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility()]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample');
  });

  it('should apply darkmode', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility('darkmode')]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample');
  });

  it('should apply brightmode', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility('brightmode')]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/co_white,e_colorize:40/sample');
  });

  it('should apply monochrome', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility('monochrome')]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/e_grayscale/sample');
  });

  it('should apply colorblind', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility('colorblind')]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/e_assist_colorblind/sample');
  });

  it('should default if supplied with incorrect mode', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [accessibility('ddd')]});
    expect(getImageAttr(container, 'src')).toEqual('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample');
  });
});
