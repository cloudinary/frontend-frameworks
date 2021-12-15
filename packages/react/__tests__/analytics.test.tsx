import { AdvancedImage } from '../src';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';
import { SDKAnalyticsConstants } from '../src/internal/SDKAnalyticsConstants';
// @ts-ignore
import { version } from '../package.json';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });

describe('analytics', () => {
  beforeEach(() => {
    SDKAnalyticsConstants.sdkSemver = '1.0.0';
    SDKAnalyticsConstants.techVersion = '10.2.5';
  });

  afterEach(() => {
    SDKAnalyticsConstants.sdkSemver = version;
    SDKAnalyticsConstants.techVersion = React.version;
  });
  it('creates an img with analytics', function () {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} />);
    setTimeout(() => {
      expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/sample"');
    }, 0);// one tick
  });
});
