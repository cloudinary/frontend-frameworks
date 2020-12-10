import { CldImg } from './CldImg'
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

describe('CldImg', () => {
  it('is truthy', () => {
    expect(CldImg).toBeTruthy()
  })
})

let imgInit = new CloudinaryImage();
imgInit
  .setConfig({
    cloud: {
      cloudName: 'demo'
    },
    url: {
      secure: true,
    }
  })
  .setPublicID('sample');
//
// //test imports
// import React from 'react'
// import { shallow } from 'enzyme'
// import { CldImg } from './CldImg'
// import {accessibility} from "../../html/dist";
// import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
//
// describe('<CldImg />', () => {
//   let component: any;
//
//   beforeEach(() => {
//     component = shallow(<CldImg transformation={imgInit} plugins={[accessibility]}/>)
//   })
//   test('It should mount', () => {
//     component.state("url");
//     expect(component.length).toBe(1)
//   })
// })
