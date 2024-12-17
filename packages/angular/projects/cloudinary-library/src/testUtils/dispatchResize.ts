import { tick } from '@angular/core/testing';

/**
 * Dispatches resize event
 * @param width {string}  width to resize to
 * @param fixture {any} The current fixture
 * @param time {number} The timout
 */
export function dispatchResize(width: string, fixture: any, time: number) {
  document.body.style.width = width;
  window.dispatchEvent(new Event('resize'));
  fixture.detectChanges();
  tick(time);
}
