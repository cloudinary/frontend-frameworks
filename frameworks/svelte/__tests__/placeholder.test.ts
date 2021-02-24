import {AdvancedImage, placeholder} from '../src/index';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {getImageAttr, mount} from "./testUtils/testUtils";
import {PLACEHOLDER_IMAGE_OPTIONS} from '../../html/src/utils/internalConstants';
import {sepia} from '@cloudinary/base/actions/effect';

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});
const {blur, vectorize, pixelate} = PLACEHOLDER_IMAGE_OPTIONS;
const predominantColor = PLACEHOLDER_IMAGE_OPTIONS['predominant-color'];
const cldImg = cloudinaryImage;

describe('placeholder', () => {
  it('should apply default', async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder()]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${vectorize}/sample`);
  });

  it("should apply 'vectorize'", async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder('vectorize')]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${vectorize}/sample`);
  });

  it('should apply pixelate', async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder('pixelate')]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${pixelate}/sample`);
  });

  it('should apply blur', async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder('blur')]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${blur}/sample`);
  });

  it('should apply predominant-color', async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder('predominant-color')]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${predominantColor}/sample`);
  });

  it('should default if supplied with incorrect mode', async () => {
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder('ddd')]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/${vectorize}/sample`);
  });

  it('should append placeholder transformation', async () => {
    cloudinaryImage.effect(sepia());
    const {container} = await mount(AdvancedImage, {cldImg, plugins: [placeholder()]});
    expect(getImageAttr(container, 'src')).toEqual(`https://res.cloudinary.com/demo/image/upload/e_sepia/${vectorize}/sample`);
  });
});
