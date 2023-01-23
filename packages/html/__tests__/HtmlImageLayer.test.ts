import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "../src";

describe('HtmlImageLayer tests', function () {
    const cldImage = new CloudinaryImage('sample', {cloudName: 'demo'});

    it('should set image src', function () {
        const img = document.createElement('img');
        new HtmlImageLayer(img, cldImage, []);
        process.nextTick(() => {
            expect(img.src).toEqual('https://res.cloudinary.com/demo/image/upload/sample?_a=ATRSRAA0')
        })
    });
});
