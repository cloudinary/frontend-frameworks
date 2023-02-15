import {CloudinaryImage} from "@cloudinary/url-gen";
import {HtmlImageLayer} from "../src";
import {BaseAnalyticsOptions} from "../src/types";
import {responsive} from "../src/plugins/responsive";
import {placeholder} from "../src/plugins/placeholder";
import {accessibility} from "../src/plugins/accessibility";
import {PluginResponse} from "../types";
import {cancelCurrentlyRunningPlugins} from "../src/utils/cancelCurrentlyRunningPlugins";
import * as process from "process";

jest.useFakeTimers();

const sdkAnalyticsTokens: BaseAnalyticsOptions = {
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

    it('should set image src twice if HtmlImageLayer instance won\'t be destroyed', async function () {
        const img = document.createElement('img');
        const pluginsState: any = {
            cleanupCallbacks: []
        };
        const spy = jest.spyOn(img, 'setAttribute');
        const dummyFailingPlugin = (): Promise<PluginResponse> => {
            return new Promise((resolve) => {
                pluginsState.cleanupCallbacks.push(() => {
                    resolve('canceled')
                })
            })
        }
        const dummyLazyLoadPlugin = (): Promise<PluginResponse> => {
            return new Promise((resolve) => {
                resolve({lazyload: true});
            })
        }
        new HtmlImageLayer(img, cldImage, [dummyFailingPlugin]);
        new HtmlImageLayer(img, cldImage, [dummyLazyLoadPlugin]);
        cancelCurrentlyRunningPlugins(pluginsState);
        await flushPromises();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set image src only once if HtmlImageLayer instance will be destroyed', async function () {
        const img = document.createElement('img');
        const pluginsState: any = {
            cleanupCallbacks: []
        };
        const spy = jest.spyOn(img, 'setAttribute');
        const dummyFailingPlugin = (): Promise<PluginResponse> => {
            return new Promise((resolve) => {
                pluginsState.cleanupCallbacks.push(() => {
                    resolve('canceled')
                })
            })
        }
        const dummyLazyLoadPlugin = (): Promise<PluginResponse> => {
            return new Promise((resolve) => {
                resolve({lazyload: true});
            })
        }
        const instance1 = new HtmlImageLayer(img, cldImage, [dummyFailingPlugin]);
        new HtmlImageLayer(img, cldImage, [dummyLazyLoadPlugin]);
        cancelCurrentlyRunningPlugins(pluginsState);
        instance1.destroy();
        await flushPromises();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
