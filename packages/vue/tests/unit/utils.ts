// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { nextTick } from "vue";

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
