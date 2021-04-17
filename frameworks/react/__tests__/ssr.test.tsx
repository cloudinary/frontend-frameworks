/**
 * @jest-environment node
 */
import { AdvancedImage, placeholder, responsive, accessibility, lazyload } from '../src'
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import React from 'react';
import { renderToString } from 'react-dom/server'

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });

describe('ssr', () => {
  it('should render accessibility transformation with accessibility', function (done) {
    const ElementImageHtml = renderToString(<AdvancedImage cldImg={cloudinaryImage} plugins={[accessibility()]} />);
    setTimeout(() => {
      expect(ElementImageHtml).toContain('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample');
      done();
    }, 0);// one tick
  });

  it('should render original image with placeholder', function (done) {
    const ElementImageHtml = renderToString(<AdvancedImage cldImg={cloudinaryImage} plugins={[placeholder()]} />);
    setTimeout(() => {
      expect(ElementImageHtml).toContain('https://res.cloudinary.com/demo/image/upload/sample');
      done();
    }, 0);// one tick
  });

  it('should render original image when responsive', function (done) {
    const ElementImageHtml = renderToString(<AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />);
    setTimeout(() => {
      expect(ElementImageHtml).toContain('https://res.cloudinary.com/demo/image/upload/sample');
      done();
    }, 0);// one tick
  });

  it('should render original image when lazy loaded', function (done) {
    const ElementImageHtml = renderToString(<AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]} />);
    setTimeout(() => {
      expect(ElementImageHtml).toContain('https://res.cloudinary.com/demo/image/upload/sample');
      done();
    }, 0);// one tick
  });
});
