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
