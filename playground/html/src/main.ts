import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "@cloudinary/html";
import {responsive} from "@cloudinary/html";

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
