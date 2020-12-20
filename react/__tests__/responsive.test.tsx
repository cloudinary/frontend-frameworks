import { CldImg, responsive} from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {mount} from 'enzyme';
import React  from "react";
import {ResponsiveHelper} from './testUtils/responsiveHelperWrapper';
import {crop} from "@cloudinary/base/actions/resize";

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('responsive', () => {
  it("should apply initial container width (default 250)", function (done) {
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    setTimeout(() => {
      const el = component.find('#id').getDOMNode();
      expect(el.clientWidth).toBe(250);
      done();
    }, 1000);
  });

  it("should append to existing transformation", function () {
    cl.resize(crop('500'));
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(component.html()).toBe("<div id=\"id\"><img src=\"https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample\"></div>");
    }, 1000);
  });

  it("should update container width on window resize", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive()]}/>
      </ResponsiveHelper>);

    const el = component.find('#id').getDOMNode();
    Object.defineProperty(el, 'clientWidth', {value: 1000, configurable: true});
    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(el.clientWidth).toBe(1000);
    }, 1000);
  });

  it("should step by the 100th", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive(100)]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(component.html()).toBe("<div id=\"id\"><img src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample\"></div>");
    }, 1000);
  });

  it("should step by breakpoints", function () {
    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([800, 1000, 1200, 3000])]}/>
      </ResponsiveHelper>);

    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(component.html()).toBe("<div id=\"id\"><img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample\"></div>");
    }, 100);

    //simulate resize to 975
    setTimeout(() => {
      const el = component.find('#id').getDOMNode();
      Object.defineProperty(el, 'clientWidth', {value: 975, configurable: true});
      window.dispatchEvent(new Event('resize'));
      expect(component.html()).toBe("<div id=\"id\"><img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample\"></div>");
    }, 50);
  });

  it("should not resize to larger than provided breakpoints", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([800, 1000, 1200, 3000])]}/>
      </ResponsiveHelper>);

    //simulate resize to 975
    setTimeout(() => {
      const el = component.find('#id').getDOMNode();
      Object.defineProperty(el, 'clientWidth', {value: 4000, configurable: true});
      window.dispatchEvent(new Event('resize'));

      expect(component.html()).toBe("<div id=\"id\"><img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample\"></div>");
    }, 50);
  });

  it("should handle unordered breakpoints", function () {

    let component = mount(
      <ResponsiveHelper>
        <CldImg transformation={cl} plugins={[responsive([1000, 800, 3000, 1200])]}/>
      </ResponsiveHelper>);

    //simulate resize to 975
    setTimeout(() => {
      const el = component.find('#id').getDOMNode();
      Object.defineProperty(el, 'clientWidth', {value: 5000, configurable: true});
      window.dispatchEvent(new Event('resize'));
      expect(component.html()).toBe("<div id=\"id\"><img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample\"></div>");
    }, 50);
  });
});
