import { AdvancedVideo } from '../src';
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

  it('should render video with input sources', function (done) {
    const sources = [
      {
        type: 'mp4',
        codecs: ['vp8', 'vorbis'],
        videoCodec: 'auto'
      },
      {
        type: 'webm',
        codecs: ['avc1.4D401E', 'mp4a.40.2'],
        videoCodec: 'vp9'
      }];

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} sources={sources} />);

    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_auto/sample.mp4" type="video/mp4; codecs=vp8, vorbis">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_vp9/sample.webm" type="video/webm; codecs=avc1.4D401E, mp4a.40.2"></video>');
      done();
    }, 0);// one tick
  });

  it('should pass video attributes', function (done) {
    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} controls autoPlay playsInline loop />);

    setTimeout(() => {
      expect(component.html()).toContain('controls="" autoplay="" playsinline="" loop=""');
      done();
    }, 0);// one tick
  });

  it('should contain poster', function (done) {
    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} poster='www.sample.com' />);

    setTimeout(() => {
      expect(component.html()).toContain('poster="www.sample.com"');
      done();
    }, 0);// one tick
  });

  it('should simulate onPlay event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} onPlay={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('play');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onLoadStart event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} onLoadStart={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('loadstart');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onEnded event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} onEnded={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('ended');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onError event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} onError={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('error');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onPlaying event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldvid={cloudinaryVideo} onPlaying={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('playing');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });
});
