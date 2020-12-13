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
    let tag = await mount(<CldImg transformation={cl}/>);
    expect(tag.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  });

  // it("should pass style", async function() {
  //   let tag = await mount(<CldImg style={{height: "500px"}} transformation={cl}/>);
  //   expect(tag.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  // });
});
