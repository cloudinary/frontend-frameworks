import { CloudinaryVideo } from "@cloudinary/url-gen";
import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto, theora, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';

import { HtmlVideoLayer } from "../src";

jest.useFakeTimers();

const flushPromises = async () => {
    jest.advanceTimersByTime(10);
    await Promise.resolve();
}

describe('HtmlVideoLayer tests', function () {
    const cldVideo = new CloudinaryVideo('sample.mp4', {cloudName: 'demo'}, { analytics: false });
    
    it('should not append extension when useFetchFormat video option is used with default sources', async function() {
        const video = document.createElement('video', {});
        new HtmlVideoLayer(video, cldVideo, undefined, [], {}, undefined, { useFetchFormat: true });
        await flushPromises();
        
        expect(video.childNodes[0].src).toBe('https://res.cloudinary.com/demo/video/upload/f_webm/sample.mp4');
        expect(video.childNodes[0].type).toBe('video/webm');

        expect(video.childNodes[1].src).toBe('https://res.cloudinary.com/demo/video/upload/f_mp4/sample.mp4');
        expect(video.childNodes[1].type).toBe('video/mp4');

        expect(video.childNodes[2].src).toBe('https://res.cloudinary.com/demo/video/upload/f_ogv/sample.mp4');
        expect(video.childNodes[2].type).toBe('video/ogg');
    });    

    it('should not append extension when useFetchFormat video option is used', async function() {
        const sources = [
        {
            type: 'mp4',
            codecs: ['avc1.4d002a'],
            transcode: videoCodec(auto())
        },
        {
            type: 'webm',
            codecs: ['vp8', 'vorbis'],
            transcode: videoCodec(vp9())
        },
        {
            type: 'ogv',
            codecs: ['theora'],
            transcode: [videoCodec(theora())],
        }];
        const video = document.createElement('video', {});
        new HtmlVideoLayer(video, cldVideo, sources, [], {}, undefined, { useFetchFormat: true });
        await flushPromises();

        expect(video.childNodes[0].src).toBe('https://res.cloudinary.com/demo/video/upload/vc_auto/f_mp4/sample.mp4');
        expect(video.childNodes[0].type).toBe('video/mp4; codecs=avc1.4d002a');

        expect(video.childNodes[1].src).toBe('https://res.cloudinary.com/demo/video/upload/vc_vp9/f_webm/sample.mp4');
        expect(video.childNodes[1].type).toBe('video/webm; codecs=vp8, vorbis');

        expect(video.childNodes[2].src).toBe('https://res.cloudinary.com/demo/video/upload/vc_theora/f_ogv/sample.mp4');
        expect(video.childNodes[2].type).toBe('video/ogg; codecs=theora');
    });
});
