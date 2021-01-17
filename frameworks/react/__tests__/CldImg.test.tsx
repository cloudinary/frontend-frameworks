import { CldImg } from '../src'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {mount} from 'enzyme';
import React from "react";

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'});

describe('CldImg', () => {
  it('is truthy', () => {
    expect(CldImg).toBeTruthy()
  });

  it('renders CldImg', async () => {
    const component = await mount(<CldImg transformation={cloudinaryImage}/>);
    expect(component).toMatchSnapshot();
  });

  it("should create an img tag", async function() {
    let component = await mount(<CldImg transformation={cloudinaryImage}/>);
    expect(component.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  });

  it("should add style to img component", async function() {
    let component = await mount(<CldImg style={{opacity: "0.5"}} transformation={cloudinaryImage}/>);
    expect(component.find('img').prop('style')).toStrictEqual({"opacity": "0.5"});
  });
});
