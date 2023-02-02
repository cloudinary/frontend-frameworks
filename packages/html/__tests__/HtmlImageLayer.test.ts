import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "../src";
import {AnalyticsOptions} from "../src/types";
import {responsive} from "../src/plugins/responsive";
import {placeholder} from "../src/plugins/placeholder";
import {lazyload} from "../src/plugins/lazyload";
import {accessibility} from "../src/plugins/accessibility";

jest.useFakeTimers();

const sdkAnalyticsTokens: AnalyticsOptions = {
    sdkSemver: '1.0.0',
    techVersion: '1.0.0',
    sdkCode: 'X'
}

const flushPromises = async () => {
    jest.advanceTimersByTime(100);
    await Promise.resolve();
}

describe('HtmlImageLayer tests', function () {
    const cldImage = new CloudinaryImage('sample', {cloudName: 'demo'});

    it('should set image src', async function () {
        const img = document.createElement('img');
        new HtmlImageLayer(img, cldImage, [], sdkAnalyticsTokens);
        await flushPromises();
        expect(img.src).toEqualAnalyticsToken('AXAABAB0');
    });

    it('should use feature flag for responsive plugin', async function () {
        const parentElement = document.createElement('div');
        const img = document.createElement('img');
        parentElement.append(img);
        new HtmlImageLayer(img, cldImage, [responsive({steps: [100]})], sdkAnalyticsTokens);
        await flushPromises();
        expect(img.src).toEqualAnalyticsToken('AXAABABA');
    });

    it('should use feature flag for placeholder plugin', async function () {
        const img = document.createElement('img');
        new HtmlImageLayer(img, cldImage, [placeholder()], sdkAnalyticsTokens);
        await flushPromises();
        expect(img.src).toEqualAnalyticsToken('AXAABABB');
    });

    it('should use feature flag for accessibility plugin', async function () {
        const img = document.createElement('img');
        new HtmlImageLayer(img, cldImage, [accessibility()], sdkAnalyticsTokens);
        await flushPromises();
        expect(img.src).toEqualAnalyticsToken('AXAABABD');
    });
});
