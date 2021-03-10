import { BrowserUtils } from 'wdio-allure-ts';

/**
 * Holds common methods for tests
 */
export const sampleAppUrl: string = 'http://127.0.0.1:8000';
/**
 * common describe for specs
 * @param name spec name
 * @param body spec body -placeholder
 */

export function describeCommon(name: string, body: () => any): void {
  describe(`${name}`, () => {
    /**
     * Navigate to sampleApp and wait for it to load
     */
    beforeEach(() => {
      BrowserUtils.navigateToUrl(sampleAppUrl);
      BrowserUtils.waitForDisplayed("//*[@id='top']");
    });

    /**
     * Test context
     */
    body();
  });
}
