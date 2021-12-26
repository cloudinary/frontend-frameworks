import { AdvancedVideo } from '../src';
import { CloudinaryVideo } from '@cloudinary/url-gen';
import { mount } from 'enzyme';
import React from 'react';
import { auto, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import { videoCodec } from '@cloudinary/url-gen/actions/transcode';

const cloudinaryVideo = new CloudinaryVideo('sample', { cloudName: 'demo' }, { analytics: false });
const cloudinaryVideoWithAnalytics = new CloudinaryVideo('sample', { cloudName: 'demo' }, { analytics: true });

describe('AdvancedVideo', () => {
  it('should render video with default sources', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.webm" type="video/webm">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.mp4" type="video/mp4">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.ogg" type="video/ogg"></video>');
      done();
    }, 0);// one tick
  });

  it('should render video with analytics with default sources', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideoWithAnalytics} />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.webm?_a=ATAEtAA0" type="video/webm">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.mp4?_a=ATAEtAA0" type="video/mp4">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.ogg?_a=ATAEtAA0" type="video/ogg"></video>');
      done();
    }, 0);// one tick
  });

  it('should render video with input sources', function (done) {
    const sources = [
      {
        type: 'mp4',
        codecs: ['vp8', 'vorbis'],
        transcode: videoCodec(auto())
      },
      {
        type: 'webm',
        codecs: ['avc1.4D401E', 'mp4a.40.2'],
        transcode: videoCodec(vp9())
      }];

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} sources={sources} />);

    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_auto/sample.mp4" type="video/mp4; codecs=vp8, vorbis">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_vp9/sample.webm" type="video/webm; codecs=avc1.4D401E, mp4a.40.2"></video>');
      done();
    }, 0);// one tick
  });

  it('should pass video attributes', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} controls autoPlay playsInline loop />);

    setTimeout(() => {
      expect(component.html()).toContain('controls="" autoplay="" playsinline="" loop=""');
      done();
    }, 0);// one tick
  });

  it('should contain poster', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} poster='www.example.com' />);

    setTimeout(() => {
      expect(component.html()).toContain('poster="www.example.com"');
      done();
    }, 0);// one tick
  });

  it('should simulate onPlay event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} onPlay={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('play');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onLoadStart event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} onLoadStart={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('loadstart');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onEnded event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} onEnded={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('ended');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onError event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} onError={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('error');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('should simulate onPlaying event', function (done) {
    const mockCallBack = jest.fn();

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} onPlaying={mockCallBack} />);
    setTimeout(() => {
      component.find('video').simulate('playing');
      expect(mockCallBack.mock.calls.length).toEqual(1);
      done();
    }, 0);// one tick
  });

  it('Should support forwarding innerRef to underlying video element', () => {
    const myRef = React.createRef();
    mount(<AdvancedVideo cldVid={cloudinaryVideo} innerRef={myRef} />);
    const video: any = myRef.current;

    ['play', 'pause', 'canPlayType', 'addTextTrack'].forEach((func) => {
      expect(typeof video[func]).toBe('function');
    });
  });
});
