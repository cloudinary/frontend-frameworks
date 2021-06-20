import { AdvancedImage, AdvancedPicture } from '../src';
import { CloudinaryImage } from '@cloudinary/base';
import { mount } from 'enzyme';
import React from 'react';
import { crop } from '@cloudinary/base/actions/resize';

const defualtImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });
const smallImage = new CloudinaryImage('dog', { cloudName: 'demo' }, { analytics: false }).resize(crop(500));
const largeImage = new CloudinaryImage('woman', { cloudName: 'demo' }, { analytics: false }).resize(crop(1000));

describe('AdvancedPicture', () => {
  it('should render picture tag  with source', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defualtImage} sources={[
          {
            minWidth: 500,
            maxWidth: 500,
            image: smallImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/dog" sizes="80vw" media="(min-width: 500px) and (max-width: 500px)">' +
        '</picture>');
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with multiple sources', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defualtImage} sources={[
          {
            minWidth: 500,
            maxWidth: 700,
            image: smallImage,
            sizes: '80vw'
          },
          {
            minWidth: 2000,
            maxWidth: 1000,
            image: largeImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/dog" sizes="80vw"' +
        ' media="(min-width: 500px) and (max-width: 700px)">' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_crop,w_1000/woman" sizes="80vw"' +
        ' media="(min-width: 2000px) and (max-width: 1000px)">' +
        '</picture>');
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with providing only minWidth', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defualtImage} sources={[
          {
            minWidth: 500,
            image: smallImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/dog" sizes="80vw" media="(min-width: 500px)">' +
        '</picture>');
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with providing only maxWidth', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defualtImage} sources={[
          {
            maxWidth: 500,
            image: smallImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/dog" sizes="80vw"' +
        ' media="(max-width: 500px)">' +
        '</picture>');
      done();
    }, 0);// one tick
  });
});
