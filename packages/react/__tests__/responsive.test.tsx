import { AdvancedImage, responsive } from '../src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';
import { ResponsiveHelper } from './testUtils/responsiveHelperWrapper';
import { crop } from '@cloudinary/url-gen/actions/resize';
import { dispatchResize } from './testUtils/dispatchResize';
import FakeTimers from '@sinonjs/fake-timers'

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' }, { analytics: false });

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

  it('should update container width on window resize', function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />
      </ResponsiveHelper>);

    const el = dispatchResize(component, 100);
    clock.tick(100); // timeout for debounce
    expect(el.clientWidth).toBe(100);
  });

  it('should step by the 100th', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive(100)]} />
      </ResponsiveHelper>);

    await clock.tickAsync(0); // one tick
    window.dispatchEvent(new Event('resize'));
    await clock.tickAsync(100); // timeout for debounce
    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"');
  });

  it('should step by breakpoints', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive([800, 1000, 1200, 3000])]} />
      </ResponsiveHelper>);

    await clock.tickAsync(0); // one tick
    window.dispatchEvent(new Event('resize'));
    await clock.tickAsync(100); // timeout for debounce

    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample"');

    // simulate resize to 975
    await clock.tickAsync(0); // one tick
    dispatchResize(component, 975);
    await clock.tickAsync(100); // timeout for debounce

    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample"');
  });

  it('should not resize to larger than provided breakpoints', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive([800, 1000, 1200, 3000])]} />
      </ResponsiveHelper>);

    await clock.tickAsync(0); // one tick
    dispatchResize(component, 4000);
    await clock.tickAsync(100); // timeout for debounce

    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"');
  });

  it('should handle unordered breakpoints', async function () {
    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive([1000, 800, 3000, 1200])]} />
      </ResponsiveHelper>);

    await clock.tickAsync(0); // one tick
    dispatchResize(component, 5000);
    await clock.tickAsync(100); // timeout for debounce

    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"');
  });

  it('should append to existing transformation', async function () {
    cloudinaryImage.resize(crop('500'));

    const component = mount(
      <ResponsiveHelper>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[responsive()]} />
      </ResponsiveHelper>);

    await clock.tickAsync(0); // one tick
    window.dispatchEvent(new Event('resize'));
    await clock.tickAsync(100); // timeout for debounce

    expect(component.html()).toContain('src="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample"');
  });
});
