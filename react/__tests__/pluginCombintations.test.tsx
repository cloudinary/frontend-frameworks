import {accessibility, CldImg, lazyload, placeholder, responsive} from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {mount} from 'enzyme';
import React from "react";
import testWithMockedIntersectionObserver from "./testUtils/setupIntersectionObserverMock";


const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('plugin combinations', () => {
  const mockImage = {
    src: null,
    onload: () => {},
    onerror: () => {}
  };
  beforeEach(() => {
    // @ts-ignore
    window.Image = function() { return mockImage }
  });

  it("lazyload should block any plugins from loading",  function () {
    let component = mount(<CldImg transformation={cl} plugins={[lazyload(), responsive(), placeholder()]}/>);
    expect(component.html()).toBe("<img>");
  });

  it("should display plugin image after lazyload",  function (done) {
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void)=>{
      let component = mount(<CldImg transformation={cl} plugins={[lazyload(), responsive()]}/>);
      mockIntersectionEvent([{isIntersecting: true, target: component.getDOMNode()}]);
      setTimeout(()=>{
        expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/c_scale,w_0/sample\">");
        done();
      }, 0);// one tick
    });
  });

  it("should load original image with responsive dimensions",  function (done) {
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void)=>{
      let component = mount(<CldImg transformation={cl} plugins={[lazyload(), responsive(), placeholder()]}/>);
      mockIntersectionEvent([{isIntersecting: true, target: component.getDOMNode()}]);
      mockImage.onload();
      setTimeout(()=>{
        expect(mockImage.src).toBe("https://res.cloudinary.com/demo/image/upload/c_scale,w_0/sample");
        done();
      }, 0);// one tick
    });
  });

  it("should prepend accessibility to plugin transformation",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility(), placeholder()]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/e_vectorize/f_svg/sample\">");
      done();
    }, 0);// one tick
  });
});


