import { AdvancedImage, lazyload } from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {mount, shallow, ShallowWrapper} from 'enzyme';
import React, {Requireable} from "react";
import testWithMockedIntersectionObserver from "./testUtils/setupIntersectionObserverMock";

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'});

describe('lazy-load', () => {
  it("should not have src pre-scroll", async function() {
    let component = await mount(
      <div>
        <div style={{height: "1000px"}}/>
        <AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]}/>
      </div>
      );
    //no src pre scroll
    expect(component.html()).toBe("<div><div style=\"height: 1000px;\"></div><img></div>");
  });

  it("should have src when in view",  function(done) {
    const elm = document.createElement('img');
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void)=>{
      let component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]}/>);
      mockIntersectionEvent([{isIntersecting: true, target: component.getDOMNode()}]);
      setTimeout(()=>{
        expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/sample\">");
        done();
      }, 0);// one tick
    });
  });

  it("should set lazyload root margin and threshold",  function(done) {
    const elm = document.createElement('img');
    testWithMockedIntersectionObserver((mockIntersectionEvent: ({}) => void)=>{
      //@ts-ignore
      let component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[(lazyload('10px', 0.5))]}/>);
      mockIntersectionEvent([{isIntersecting: true, target: component.getDOMNode()}]);
      setTimeout(()=>{
        expect(component.html()).toBe("<img src=\"https://res.cloudinary.com/demo/image/upload/sample\">");
        done();
      }, 0);// one tick
    });
  });
});


