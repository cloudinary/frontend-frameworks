import { CldImg, responsive} from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {mount} from 'enzyme';
import React  from "react";
import {ResponsiveHelper} from './testUtils/responsiveHelperWrapper';
import {crop} from "@cloudinary/base/actions/resize";
import {dispatchResize} from "./testUtils/dispatchResize";
import FakeTimers from '@sinonjs/fake-timers'


const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('responsive', () => {
  let clock:any;
  beforeEach(() => {
    clock = FakeTimers.install()
  });
  afterEach(() => {
    clock.uninstall()
  });

  it("should apply initial container width (default 250)", function () {
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));
    clock.tick(100);

    const el = component.find('#wrapper').getDOMNode();
    expect(el.clientWidth).toBe(250);

  });

  it("should update container width on window resize", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    const el = dispatchResize(component, 100);
    clock.tick(100);
    expect(el.clientWidth).toBe(100);
  });

  it("should step by the 100th", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive(100)]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample\"></div>");
  });

  it("should step by breakpoints", function () {
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([800, 1000, 1200, 3000])]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample\"></div>");

    //simulate resize to 975
    dispatchResize(component, 975);
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample\"></div>");
  });

  it("should not resize to larger than provided breakpoints", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([800, 1000, 1200, 3000])]}/>
      </ResponsiveHelper>);

    dispatchResize(component, 4000);
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample\"></div>");
  });

  it("should handle unordered breakpoints", function () {
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([1000, 800, 3000, 1200])]}/>
      </ResponsiveHelper>);

    dispatchResize(component, 5000);
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample\"></div>");
  });

  it("should append to existing transformation", function () {
    cl.resize(crop('500'));

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));
    clock.tick(100);
    expect(component.html()).toBe("<div id=\"wrapper\"><img" +
      " src=\"https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample\"></div>");
  });
});

