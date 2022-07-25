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
