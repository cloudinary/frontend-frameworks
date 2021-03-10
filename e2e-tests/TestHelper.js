"use strict";
exports.__esModule = true;
exports.describeCommon = exports.sampleAppUrl = void 0;
var wdio_allure_ts_1 = require("wdio-allure-ts");
/**
 * Holds common methods for tests
 */
exports.sampleAppUrl = 'http://127.0.0.1:8000';
/**
 * common describe for specs
 * @param name spec name
 * @param body spec body -placeholder
 */
function describeCommon(name, body) {
    describe("" + name, function () {
        /**
         * Navigate to sampleApp and wait for it to load
         */
        beforeEach(function () {
            wdio_allure_ts_1.BrowserUtils.navigateToUrl(exports.sampleAppUrl);
            wdio_allure_ts_1.BrowserUtils.waitForDisplayed("//*[@id='top']");
        });
        /**
         * Test context
         */
        body();
    });
}
exports.describeCommon = describeCommon;
