import { CldImg, placeholder } from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import  {PLACEHOLDER_IMAGE_OPTIONS} from '../../html/src/internalConstnats';
import {mount} from 'enzyme';
import React  from "react";
import {sepia} from "@cloudinary/base/actions/effect";

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
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample\">`);
      done();
    }, 0);// one tick
  });

  it("should apply 'vectorize'",  function () {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('vectorize')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample\">`);
    }, 0);// one tick
  });

  it("should apply pixelate",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('pixelate')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample\">`);
      done();
    }, 0);// one tick
  });

  it("should apply blur",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('blur')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample\">`);
      done();
    }, 0);// one tick
  });

  it("should apply predominant-color",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('predominant-color')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS["predominant-color"]}/sample\">`);
      done();
    }, 0);// one tick
  });

  it("should default if supplied with incorrect mode",  function (done) {
    let component = mount(<CldImg transformation={cl} plugins={[placeholder('ddd')]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample\">`);
      done();
    }, 0);// one tick
  });

  it("should append placeholder transformation",  function (done) {
    cl.effect(sepia());
    let component = mount(<CldImg transformation={cl} plugins={[placeholder()]}/>);
    setTimeout(()=>{
      expect(component.html()).toBe(`<img src=\"https://res.cloudinary.com/demo/image/upload/e_sepia/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample\">`);
      done();
    }, 0);// one tick
  });
});

