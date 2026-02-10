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
  it('creates an img with analytics', function (done) {
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} />);
    setTimeout(() => {
      expect(component.html()).toEqual('<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=DAJAABDSZAA0">');
      done();
    }, 0);// one tick
  });
});

describe('analytics when created via CLI', () => {
  let AdvancedImageCLI: typeof AdvancedImage;
  let CloudinaryImageCLI: typeof CloudinaryImage;

  beforeAll(() => {
    process.env.CLOUDINARY_SOURCE = 'cli';
    jest.resetModules();
    const src = require('../src');
    const constants = require('../src/internal/SDKAnalyticsConstants');
    AdvancedImageCLI = src.AdvancedImage;
    CloudinaryImageCLI = require('@cloudinary/url-gen/assets/CloudinaryImage').CloudinaryImage;
    const SDKAnalyticsConstantsCLI = constants.SDKAnalyticsConstants;
    SDKAnalyticsConstantsCLI.sdkSemver = '1.0.0';
    SDKAnalyticsConstantsCLI.techVersion = '10.2.5';
  });

  afterAll(() => {
    delete process.env.CLOUDINARY_SOURCE;
    jest.resetModules();
  });

  it('generates analytics with Product B (Integrations) and sdkCode H (React CLI)', function (done) {
    const cldImg = new CloudinaryImageCLI('sample', { cloudName: 'demo' });
    const component = mount(<AdvancedImageCLI cldImg={cldImg} />);
    setTimeout(() => {
      const html = component.html();
      const match = html.match(/_a=([A-Za-z0-9]+)/);
      expect(match).toBeTruthy();
      const token = match![1];
      // Algorithm B: 1st = algo, 2nd = product (B = Integrations), 3rd = sdkCode (H = React CLI)
      expect(token[1]).toBe('B');
      expect(token[2]).toBe('H');
      done();
    }, 0);
  });
});
