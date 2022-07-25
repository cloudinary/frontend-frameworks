import { AdvancedImage, lazyload } from '../src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';
import { testWithMockedIntersectionObserver } from '../../../testUtils/testWithMockedIntersectionObserver'

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });

describe('lazy-load', () => {
  it('should not have src pre-scroll', async function() {
    const component = await mount(
      <div>
        <div style={{ height: '1000px' }} />
        <AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]} />
      </div>
    );
    // no src pre scroll
    expect(component.html()).toBe('<div><div style="height: 1000px;"></div><img></div>');
  });

  it('should have src when in view', function(done) {
    const elm = document.createElement('img');
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void) => {
      const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]} />);
      mockIntersectionEvent([{ isIntersecting: true, target: component.getDOMNode() }]);
      setTimeout(() => {
        expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/sample"');
        done();
      }, 0);// one tick
    });
  });

  it('should set lazyload root margin and threshold', function(done) {
    const elm = document.createElement('img');
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void) => {
      // @ts-ignore
      const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[(lazyload({ rootMargin: '10px', threshold: 0.5 }))]} />);
      mockIntersectionEvent([{ isIntersecting: true, target: component.getDOMNode() }]);
      setTimeout(() => {
        expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/sample"');
        done();
      }, 0);// one tick
    });
  });
});
