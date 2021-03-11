import {AdvancedVideo, accessibility, AdvancedImage} from '../src';
import { CloudinaryVideo } from '@cloudinary/base';
import { mount } from 'enzyme';
import React from 'react';

const cloudinaryVideo = new CloudinaryVideo('sample', { cloudName: 'demo' });

describe('AdvancedVideo', () => {
  it('should render video with default sources', function (done) {
    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.webm" type="video/webm">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.mp4" type="video/mp4">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.ogg" type="video/ogg"></video>');
      done();
    }, 0);// one tick
  });

});
