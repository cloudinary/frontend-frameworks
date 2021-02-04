import { AdvancedImage, placeholder } from '../src'
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import { PLACEHOLDER_IMAGE_OPTIONS } from '../../html/src/utils/internalConstnats';
import { mount } from 'enzyme';
import React from 'react';
import { sepia } from '@cloudinary/base/actions/effect';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });

describe('placeholder', () => {
  it('should apply default', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder()]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
      done();
    }, 0);// one tick
  });

  it("should apply 'vectorize'", function () {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder('vectorize')]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
    }, 0);// one tick
  });

  it('should apply pixelate', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder('pixelate')]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should apply blur', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder('blur')]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should apply predominant-color', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder('predominant-color')]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS['predominant-color']}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should default if supplied with incorrect mode', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder('ddd')]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should append placeholder transformation', function (done) {
    cloudinaryImage.effect(sepia());
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder()]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/e_sepia/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
      done();
    }, 0);// one tick
  });
});
