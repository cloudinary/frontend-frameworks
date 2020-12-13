import { CldImg } from './index'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {mount} from 'enzyme';
import React from "react";

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);


describe('CldImg', () => {
  it('is truthy', () => {
    expect(CldImg).toBeTruthy()
  });

  it('renders CldImg', async () => {
    const component = await mount(<CldImg transformation={cl}/>);
    expect(component).toMatchSnapshot();
  });

  it("should create an img tag", async function() {
    let component = await mount(<CldImg transformation={cl}/>);
    expect(component.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  });

  it("should add style to img component", async function() {
    let component = await mount(<CldImg style={{opacity: "0.5"}} transformation={cl}/>);
    expect(component.find('img').prop('style')).toStrictEqual({"opacity": "0.5"});
  });
});
