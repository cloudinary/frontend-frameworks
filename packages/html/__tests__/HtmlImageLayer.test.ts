import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "../src";
import {BaseAnalyticsOptions} from "../src/types";
import {responsive} from "../src/plugins/responsive";
import {placeholder} from "../src/plugins/placeholder";
import {accessibility} from "../src/plugins/accessibility";
import {PluginResponse} from "../types";
import {cancelCurrentlyRunningPlugins} from "../src/utils/cancelCurrentlyRunningPlugins";

jest.useFakeTimers();

const sdkAnalyticsTokens: BaseAnalyticsOptions = {
    sdkSemver: '1.0.0',
    techVersion: '1.0.0',
    sdkCode: 'X'
}

const flushPromises = async () => {
    jest.advanceTimersByTime(10);
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

    it('should set image src twice if HtmlImageLayer instance won\'t be unmounted', async function () {
        const img = document.createElement('img');
        const pluginsState: any = {
            cleanupCallbacks: []
        };
        const spy = jest.spyOn(img, 'setAttribute');
        const dummyFailingPlugin = (): Promise<PluginResponse> => new Promise((resolve) => {
            pluginsState.cleanupCallbacks.push(() => {
                resolve('canceled')
            })
        });
        const dummyLazyLoadPlugin = (): Promise<PluginResponse> => new Promise((resolve) => {
            resolve({lazyload: true});
        });
        new HtmlImageLayer(img, cldImage, [dummyFailingPlugin]);
        new HtmlImageLayer(img, cldImage, [dummyLazyLoadPlugin]);
        cancelCurrentlyRunningPlugins(pluginsState);
        await flushPromises();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set image src only once if HtmlImageLayer instance will be unmounted', async function () {
        const img = document.createElement('img');
        const pluginsState: any = {
            cleanupCallbacks: []
        };
        const spy = jest.spyOn(img, 'setAttribute');
        const dummyFailingPlugin = (): Promise<PluginResponse> => new Promise((resolve) => {
            pluginsState.cleanupCallbacks.push(() => {
                resolve('canceled')
            })
        });
        const dummyLazyLoadPlugin = (): Promise<PluginResponse> => new Promise((resolve) => {
            resolve({lazyload: true});
        });
        const instance1 = new HtmlImageLayer(img, cldImage, [dummyFailingPlugin]);
        new HtmlImageLayer(img, cldImage, [dummyLazyLoadPlugin]);
        cancelCurrentlyRunningPlugins(pluginsState);
        instance1.unmount();
        await flushPromises();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should verfiy no unneeded request with placeholder plugin', async function () {
        const OriginalImage = Image;
        // mocking Image constructor in order to simulate firing 'load' event
        jest.spyOn(global, "Image").mockImplementation(() => {
            const img = new OriginalImage();
            setTimeout(() => {
                img.dispatchEvent(new Event("load"));
            }, 10)
            return img;

        })
        const img = document.createElement('img');
        const imgSrcSpy = jest.spyOn(img, 'src', 'set');
        const imgSetAttributeSpy = jest.spyOn(img, 'setAttribute');

        new HtmlImageLayer(img, cldImage, [placeholder()], sdkAnalyticsTokens);
        expect(imgSrcSpy).toHaveBeenCalledTimes(1);
        // test that the initial src is set to a token contains last character "B" which is the character of placeholder plugin
        expect(imgSrcSpy.mock.calls[0][0]).toEqualAnalyticsToken('AXAABABB');
        // trigger load event in order to resolve the 1st promise of the placeholder plugin
        img.dispatchEvent(new Event('load'));
        await flushPromises();
        // resolve the 2nd promise of the placeholder plugin, which cause the placeholder plugin to create the pixelated Image
        await flushPromises();
        // resolve the 3rd promise of the placeholder plugin, which cause HtmlLayer to set the image attribute
        await flushPromises();
        expect(imgSetAttributeSpy).toHaveBeenCalledTimes(1);
        // test that the src which set by HtmlImageLayer contains last character "B" which is the character of placeholder plugin
        expect(imgSetAttributeSpy.mock.calls[0][1]).toEqualAnalyticsToken('AXAABABB');
    });
});
