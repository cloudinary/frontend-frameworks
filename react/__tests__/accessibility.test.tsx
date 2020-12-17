import { CldImg, accessibility } from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {mount} from 'enzyme';
import React  from "react";


const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('accessibility', () => {
  it("should apply default",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility()]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply darkmode",  function () {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility('darkmode')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample\">");
    }, 0);// one tick
  });

  it("should apply brightmode",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility('brightmode')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/co_white,e_colorize:40/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply monochrome",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility('monochrome')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/e_grayscale/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply colorblind",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility('colorblind')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/e_assist_colorblind/sample\">");
      done();
    }, 0);// one tick
  });

  it("should default if supplied with incorrect mode",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[accessibility('ddd')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample\">");
      done();
    }, 0);// one tick
  });

});
