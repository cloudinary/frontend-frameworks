import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "@cloudinary/html/src/layers/htmlImageLayer";
import {responsive} from "@cloudinary/html/src/plugins/responsive";

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
    const img = document.createElement('img');
    const cldImg = new CloudinaryImage('sample', {cloudName: 'demo'});
    app.append(img);
    new HtmlImageLayer(img, cldImg, [responsive({steps: [100]})], {
        sdkCode: 'X',
        sdkSemver: '1.0.0',
        techVersion: '2.0.0'
    });
}
