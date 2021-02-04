import { AdvancedImage, accessibility } from '../src';
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });

describe('accessibility', () => {
  it('should apply default', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility()]} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample"');
      done();
    }, 0);// one tick
  });

  it('should apply darkmode', function () {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility('darkmode')]} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample"');
    }, 0);// one tick
  });

  it('should apply brightmode', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility('brightmode')]} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/co_white,e_colorize:40/sample"');
      done();
    }, 0);// one tick
  });

  it('should apply monochrome', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility('monochrome')]} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/e_grayscale/sample"');
      done();
    }, 0);// one tick
  });

  it('should apply colorblind', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility('colorblind')]} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/e_assist_colorblind/sample"');
      done();
    }, 0);// one tick
  });

  it('should default if supplied with incorrect mode', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility('ddd')]} />);
    setTimeout(() => {
      expect(component.html())
        .toBe('<img src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample">');
      done();
    }, 0);// one tick
  });
});
