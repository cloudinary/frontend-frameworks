import { AdvancedImage } from '../src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });

describe('AdvancedImage', () => {
  it('is truthy', () => {
    expect(AdvancedImage).toBeTruthy()
  });
  it('should create an img tag', async function() {
    const component = await mount(<AdvancedImage cldImg={cloudinaryImage} />);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/sample"');
  });

  it('should add style to img component', async function() {
    const component = await mount(<AdvancedImage style={{ opacity: '0.5' }} cldImg={cloudinaryImage} />);
    expect(component.find('img').prop('style')).toStrictEqual({ opacity: '0.5' });
  });

  it('should resolve with a cancel on unmount', function(done) {
    const component = mount(
      <AdvancedImage
        cldImg={cloudinaryImage}
        plugins={[(_element: HTMLImageElement | HTMLVideoElement, _cldImage: CloudinaryImage, htmlPluginState: any) => {
          return new Promise((resolve) => {
            htmlPluginState.cleanupCallbacks.push(() => {
              resolve('canceled');
            });
          }).then((res) => {
            expect(res).toBe('canceled');
            done();
          });
        }]}
      />);

    component.unmount();
  });

  it('componentDidUpdate should trigger plugin rerun', function() {
    const mock = jest.fn();
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[mock]} />);

    // plugins called once
    expect(mock).toHaveBeenCalledTimes(1);

    // trigger componentDidUpdate
    component.setProps('');

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
