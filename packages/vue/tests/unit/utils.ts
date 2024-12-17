// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { nextTick } from "vue";
import { SDKAnalyticsConstants } from "../../src/internal/SDKAnalyticsConstants";

/**
 * Wait number of ticks
 * @param ticks
 */
export const waitTicks = async (ticks: number) => {
  for (let i = 0; i < ticks; i++) {
    await nextTick();
  }
};

/**
 * Run test if condition is true
 * Otherwise act as passing test
 * @param condition
 * @param args
 */
export const testIf = (condition: boolean, ...args: [string, () => void]) =>
  condition ? test(...args) : {};

export const setAnalyticsConstants = () => {
  SDKAnalyticsConstants.sdkSemver = "1.0.0";
  SDKAnalyticsConstants.techVersion = "10.2.5";
};
