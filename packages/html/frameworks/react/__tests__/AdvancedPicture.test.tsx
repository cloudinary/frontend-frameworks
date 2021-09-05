import { AdvancedPicture } from '../src';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { mount } from 'enzyme';
import React from 'react';
import { sepia } from '@cloudinary/url-gen/actions/effect';
const defaultImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });
const sepiaImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false }).effect(sepia());
const smallImage = new CloudinaryImage('dog', { cloudName: 'demo' }, { analytics: false });
const largeImage = new CloudinaryImage('woman', { cloudName: 'demo' }, { analytics: false });

describe('AdvancedPicture', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    global.console.error.mockRestore();
  });

  it('should render picture tag  with source', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} sources={[
          {
            minWidth: 500,
            maxWidth: 800,
            image: smallImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<source media="(min-width: 500px) and (max-width: 800px)" sizes="80vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/dog">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('should render picture tag using breakpoints', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} breakpoints={[500, 1000, 1500]} sources={[
          {
            image: smallImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<source srcset="https://res.cloudinary.com/demo/image/upload/c_scale,w_500/dog 500w,' +
        'https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/dog 1000w,' +
        'https://res.cloudinary.com/demo/image/upload/c_scale,w_1500/dog 1500w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample"></picture>'
      );
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with multiple sources', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} sources={[
          {
            minWidth: 500,
            maxWidth: 700,
            image: smallImage,
            sizes: '80vw'
          },
          {
            minWidth: 1000,
            maxWidth: 2000,
            image: largeImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<source media="(min-width: 500px) and (max-width: 700px)" sizes="80vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/dog">' +
        '<source media="(min-width: 1000px) and (max-width: 2000px)" sizes="80vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/woman">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with providing only minWidth', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} sources={[
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
        '<source media="(min-width: 500px)" sizes="80vw" srcset="https://res.cloudinary.com/demo/image/upload/dog">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>');
      done();
    }, 0);// one tick
  });

  it('should render picture tag  with providing only maxWidth', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} sources={[
          {
            maxWidth: 500,
            image: smallImage,
            sizes: '80vw'
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture><source media="(max-width: 500px)" sizes="80vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/dog">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample"></picture>');
      done();
    }, 0);// one tick
  });

  it('should render without sizes attribute', function (done) {
    const component = mount(
      <AdvancedPicture
        cldImg={defaultImage} sources={[
          {
            minWidth: 500,
            maxWidth: 1000,
            image: smallImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<picture>' +
        '<source media="(min-width: 500px) and (max-width: 1000px)" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/dog">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample"></picture>');
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: console log error when sizes and autoOptimalBreakpoints are provided',
    function (done) {
      mount(
        <AdvancedPicture
          autoOptimalBreakpoints
          cldImg={defaultImage}
          sources={[
            {
              minWidth: 500,
              sizes: '500px',
              image: sepiaImage
            }
          ]}
        />);
      setTimeout(() => {
        expect(console.error).toHaveBeenCalled();
        done();
      }, 0);// one tick
    });

  it('autoOptimalBreakpoints: console log error when min-width and max-width not provided',
    function (done) {
      mount(
        <AdvancedPicture
          autoOptimalBreakpoints
          cldImg={defaultImage}
          sources={[
            {
              image: sepiaImage
            }
          ]}
        />);
      setTimeout(() => {
        expect(console.error).toHaveBeenCalled();
        done();
      }, 0);// one tick
    });

  it('autoOptimalBreakpoints: console log error when min-width > max-width', function (done) {
    mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage} sources={[
          {
            maxWidth: 500,
            minWidth: 700,
            image: smallImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: should produce single src when min-width = max-width', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage}
        sources={[
          {
            minWidth: 2000,
            maxWidth: 2000,
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
        '<source media="(min-width: 2000px) and (max-width: 2000px)" sizes="100vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_2000/sample 2000w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: user breakpoints should be used when provided', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        breakpoints={[500, 1000, 1500]}
        cldImg={defaultImage}
        sources={[
          {
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
        '<source sizes="100vw" srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_500/sample 500w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1000/sample 1000w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1500/sample 1500w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample"></picture>'
      );
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: min-width and max-width above 768px', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage}
        sources={[
          {
            minWidth: 1000,
            maxWidth: 2000,
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
        '<source media="(min-width: 1000px) and (max-width: 2000px)" sizes="100vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1280/sample 1280w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1366/sample 1366w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1536/sample 1536w' +
        ',https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1600/sample 1600w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1920/sample 1920w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: min-width bellow 768px', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage}
        sources={[
          {
            minWidth: 360,
            maxWidth: 1700,
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
      '<source media="(min-width: 360px) and (max-width: 1700px)" sizes="100vw" ' +
      'srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_750/sample 750w,' +
      'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_828/sample 828w,' +
      'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1280/sample 1280w,' +
      'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1366/sample 1366w,' +
      'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1536/sample 1536w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: should generate srcset using relative width', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage}
        relativeWidth={0.2}
        sources={[
          {
            minWidth: 375,
            maxWidth: 414,
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
        '<source media="(min-width: 375px) and (max-width: 414px)" sizes="20vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_150/sample 150w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_166/sample 166w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });

  it('autoOptimalBreakpoints: replace dimensions when physical-min-width > physical-max-width', function (done) {
    const component = mount(
      <AdvancedPicture
        autoOptimalBreakpoints
        cldImg={defaultImage}
        sources={[
          {
            minWidth: 750,
            maxWidth: 1000,
            image: sepiaImage
          }
        ]}
      />);
    setTimeout(() => {
      expect(component.html()).toContain('<picture>' +
        '<source media="(min-width: 750px) and (max-width: 1000px)" sizes="100vw" ' +
        'srcset="https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1280/sample 1280w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1366/sample 1366w,' +
        'https://res.cloudinary.com/demo/image/upload/e_sepia/c_scale,w_1440/sample 1440w">' +
        '<img src="https://res.cloudinary.com/demo/image/upload/sample">' +
        '</picture>'
      );
      done();
    }, 0);// one tick
  });
});
