import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "../src";
import {AnalyticsOptions} from "../src/types";

const sdkAnalyticsTokens:AnalyticsOptions = {
    sdkSemver: '1.0.0',
    techVersion: '1.0.0',
    sdkCode: 'X'
}

describe('HtmlImageLayer tests', function () {
    const cldImage = new CloudinaryImage('sample', {cloudName: 'demo'});

    it('should set image src', function () {
        const img = document.createElement('img');
        new HtmlImageLayer(img, cldImage, [], sdkAnalyticsTokens);
        process.nextTick(() => {
            expect(img.src).toEqual('https://res.cloudinary.com/demo/image/upload/sample?_a=AXAABAB0')
        })
    });
});
