import { AdvancedImage, placeholder } from '../src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { PLACEHOLDER_IMAGE_OPTIONS } from '../../html/src/utils/internalConstants';
import { mount } from 'enzyme';
import React from 'react';
import { sepia } from '@cloudinary/url-gen/actions/effect';

describe('placeholder', () => {
  let cloudinaryImage: CloudinaryImage;

  const mockImage = {
    src: null,
    onload: () => {},
    onerror: () => {}
  };
  beforeEach(() => {
    // @ts-ignore
    window.Image = function() { return mockImage };
    cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });
  });
  it('should apply default', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder()]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
      done();
    }, 0);// one tick
  });

  it("should apply 'vectorize'", function () {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder({ mode: 'vectorize' })]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`);
    }, 0);// one tick
  });

  it('should apply pixelate', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder({ mode: 'pixelate' })]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should apply blur', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder({ mode: 'blur' })]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should apply predominant-color', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder({ mode: 'predominant-color' })]} />);
    setTimeout(() => {
      expect(component.html()).toContain(`src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS['predominant-color']}/sample"`);
      done();
    }, 0);// one tick
  });

  it('should default if supplied with incorrect mode', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder({ mode: 'ddd' })]} />);
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

  /*
  This test is built with two setTimouts since the placeholder plugin makes use of two promises.
  The placeholder image loads first. Once it loads, the promise is resolved and the
  larger image will load. Once the larger image loads, promised and plugin is resolved.
   */
  it('should not fail error', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder()]} />);
    setTimeout(() => {
      // @ts-ignore
      component.getDOMNode().onload(); // simulate element onload
      setTimeout(() => {
        mockImage.onerror(); // simulate image onerror
        expect(mockImage.src).toBe('https://res.cloudinary.com/demo/image/upload/sample');
        done();
      })
    }, 5);// one tick
  });
});
