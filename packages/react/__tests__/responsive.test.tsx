import { AdvancedImage, responsive } from '../src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { ResponsiveHelper } from './testUtils/responsiveHelperWrapper';
import { crop } from '@cloudinary/url-gen/actions/resize';
import { dispatchResize } from '../../../testUtils/dispatchResize';
import FakeTimers from '@sinonjs/fake-timers'

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });

const waitForResize = async (clock: any, component: ReactWrapper<any, React.Component['state'], React.Component>, size?: number): Promise<HTMLDivElement> => {
  await clock.tickAsync(0); // one tick
  const el = component.find('#wrapper').getDOMNode() as HTMLDivElement;
  dispatchResize(el, size);

  clock.tick(100); // timeout for debounce
  return el;
}

describe('responsive', () => {
  let clock:any;
  beforeEach(() => {
    clock = FakeTimers.install()
  });
  afterEach(() => {
    clock.uninstall()
  });

  it('should apply initial container width (default 250)', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));
    clock.tick(100); // timeout for debounce

    const el = component.find('#wrapper').getDOMNode();
    expect(el.clientWidth).toBe(250);
  });

  it('Should respect single step and ignore default width of 250 (When Step < Width)', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: 100 })]} />
      </ResponsiveHelper>);

    clock.tick(100); // timeout for debounce

    // Output is exactly 300 due to internal rounding: ROUND_UP(CONTAINER / STEP) * STEP
    // When STEP < CONTAINER, output is always a multiplication of STEP
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"');
  });

  it('Should respect single step and ignore default width of 250 (When Step > Width)', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: 251 })]} />
      </ResponsiveHelper>);

    clock.tick(100); // timeout for debounce

    // Output is exactly 251 due to internal rounding: ROUND_UP(CONTAINER / STEP) * STEP
    // When STEP > CONTAINER, output is always STEP.
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_251/sample"');
  });

  it('Should respect steps and ignore default width of 250', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: [10, 20, 30] })]} />
      </ResponsiveHelper>);

    clock.tick(100); // timeout for debounce

    // Output is closest number to parentElement, never exceeding the width of the max step )
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_30/sample"');
  });

  it('should update container width on window resize', async () => {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />
      </ResponsiveHelper>);

    const el = await waitForResize(clock, component);
    expect(el.clientWidth).toBe(100);
  });

  it('should step by the 100th', async () => {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: 100 })]} />
      </ResponsiveHelper>);

    await waitForResize(clock, component);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"');
  });

  it('should step by breakpoints', async () => {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: [800, 1000, 1200, 3000] })]} />
      </ResponsiveHelper>);

    await waitForResize(clock, component);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample"');

    await waitForResize(clock, component, 975);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample"');
  });

  it('should not resize to larger than provided breakpoints', async () => {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: [800, 1000, 1200, 3000] })]} />
      </ResponsiveHelper>);

    await waitForResize(clock, component, 4000);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"');
  });

  it('should handle unordered breakpoints', async () => {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive({ steps: [1000, 800, 3000, 1200] })]} />
      </ResponsiveHelper>);

    await waitForResize(clock, component, 5000);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"');
  });

  it('should append to existing transformation', async () => {
    cloudinaryImage.resize(crop('500'));

    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />
      </ResponsiveHelper>);

    await waitForResize(clock, component);
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample"');
  });
});
