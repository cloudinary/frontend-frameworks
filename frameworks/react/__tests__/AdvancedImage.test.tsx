import { AdvancedImage } from '../src'
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });

describe('AdvancedImage', () => {
  it('is truthy', () => {
    expect(AdvancedImage).toBeTruthy()
  });

  it('renders AdvancedImage', async () => {
    const component = await mount(<AdvancedImage cldImg={cloudinaryImage} />);
    expect(component).toMatchSnapshot();
  });

  it('should create an img tag', async function() {
    const component = await mount(<AdvancedImage cldImg={cloudinaryImage} />);
    expect(component.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  });

  it('should add style to img component', async function() {
    const component = await mount(<AdvancedImage style={{ opacity: '0.5' }} cldImg={cloudinaryImage} />);
    expect(component.find('img').prop('style')).toStrictEqual({ opacity: '0.5' });
  });
});
