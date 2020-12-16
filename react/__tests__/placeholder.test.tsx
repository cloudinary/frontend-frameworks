import { CldImg, placeholder } from '../src'
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

describe('placeholder', () => {
  it("should apply default",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder()]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/e_vectorize/f_svg/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply 'vectorize'",  function () {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('vectorize')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/e_vectorize/f_svg/sample\">");
    }, 0);// one tick
  });

  it("should apply pixelate",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('pixelate')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/e_pixelate/f_auto/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply blur",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('blur')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/e_blur:2000/f_auto/sample\">");
      done();
    }, 0);// one tick
  });

  it("should apply predominant-color",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('predominant-color')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe("<img" +
        " src=\"https://res.cloudinary.com/demo/image/upload/ar_1.0,b_auto,c_pad,w_iw_div_2/c_crop,g_north_east,h_1,w_1/c_fill,h_ih,w_iw/f_auto/sample\">");
      done();
    }, 0);// one tick
  });
});

