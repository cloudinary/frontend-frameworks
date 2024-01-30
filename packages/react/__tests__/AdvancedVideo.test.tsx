import { AdvancedVideo } from '../src';
import { CloudinaryImage, CloudinaryVideo } from '@cloudinary/url-gen';
import { mount } from 'enzyme';
import React from 'react';
import { auto, theora, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import { videoCodec } from '@cloudinary/url-gen/actions/transcode';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });
const cloudinaryVideo = new CloudinaryVideo('sample', { cloudName: 'demo' }, { analytics: false });
const cloudinaryVideoWithExtension = new CloudinaryVideo('sample.mp4', { cloudName: 'demo' }, { analytics: false });
const cloudinaryVideoWithAnalytics = new CloudinaryVideo('sample', { cloudName: 'demo' }, { analytics: true });

describe('AdvancedVideo', () => {
  it('should render video with default sources', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} />);
    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.webm" type="video/webm">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.mp4" type="video/mp4">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/sample.ogv" type="video/ogg"></video>');
      done();
    }, 0);// one tick
  });

  it('should generate url sources with correct placement of extension and url analytics', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideoWithAnalytics} />);
    setTimeout(() => {
      expect(component.html()).toContain(
        'https://res.cloudinary.com/demo/video/upload/sample.webm?_a=');
      expect(component.html()).toContain(
        'https://res.cloudinary.com/demo/video/upload/sample.ogv?_a=');
      expect(component.html()).toContain(
        'https://res.cloudinary.com/demo/video/upload/sample.mp4?_a=');
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

  it('should render video with input sources when using useFetchFormat', function (done) {
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
      },
      {
        type: 'ogv',
        codecs: ['theora'],
        transcode: videoCodec(theora())
      }];

    const component = mount(<AdvancedVideo cldVid={cloudinaryVideoWithExtension} sources={sources} useFetchFormat />);

    setTimeout(() => {
      expect(component.html()).toContain(
        '<video>' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_auto/f_mp4/sample.mp4" type="video/mp4; codecs=vp8, vorbis">' +
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_vp9/f_webm/sample.mp4" type="video/webm; codecs=avc1.4D401E, mp4a.40.2">' + 
        '<source src="https://res.cloudinary.com/demo/video/upload/vc_theora/f_ogv/sample.mp4" type="video/ogg; codecs=theora"></video>');
      done();
    }, 0);// one tick
  });

  it('should pass video attributes', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} muted controls autoPlay playsInline={false} loop />);

    setTimeout(() => {
      expect(component.html()).toContain('loop=""');
      expect(component.html()).not.toContain('playsinline');
      expect(component.html()).toContain('muted=""');
      expect(component.html()).toContain('autoplay=""');
      expect(component.html()).toContain('controls=""');
      done();
    }, 1000);// one tick
  });

  it('should contain poster', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} poster='www.example.com' />);

    setTimeout(() => {
      expect(component.html()).toContain('poster="www.example.com"');
      done();
    }, 0);// one tick
  });

  it('should contain poster when "auto" is passed as cldPoster', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} cldPoster="auto" />);

    setTimeout(() => {
      expect(component.html()).toContain('poster="https://res.cloudinary.com/demo/video/upload/q_auto/f_jpg/so_auto/sample"');
      done();
    }, 0);// one tick
  });

  it('should contain poster when cloudinary image is passed as cldPoster', function (done) {
    const component = mount(<AdvancedVideo cldVid={cloudinaryVideo} cldPoster={cloudinaryImage} />);

    setTimeout(() => {
      expect(component.html()).toContain('poster="https://res.cloudinary.com/demo/image/upload/sample"');
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
