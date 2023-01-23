import {CloudinaryVideo} from "@cloudinary/url-gen";
import {HtmlVideoLayer} from "../src";

describe('HtmlVideoLayer tests', function () {
    const cldVideo = new CloudinaryVideo('sample', {cloudName: 'demo'});

    it('should set video src', function () {
        const video = document.createElement('video');
        new HtmlVideoLayer(video, cldVideo, null);
        process.nextTick(() => {
            expect((video.children[0] as HTMLSourceElement).src).toEqual("https://res.cloudinary.com/demo/video/upload/sample.webm?_a=ATRSRAA0");
            expect((video.children[1] as HTMLSourceElement).src).toEqual("https://res.cloudinary.com/demo/video/upload/sample.mp4?_a=ATRSRAA0");
            expect((video.children[2] as HTMLSourceElement).src).toEqual("https://res.cloudinary.com/demo/video/upload/sample.ogv?_a=ATRSRAA0");
        })
    });
});
