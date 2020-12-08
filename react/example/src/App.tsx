import React from 'react'
import { CldImg, accessibility } from '@cloudinary/react';
import {TransformableImage} from '@cloudinary/base';

let img = new TransformableImage()
  .setConfig({
    cloud: {
      cloudName: 'demo'
    },
    url: {
      secure: true,
    }
  })
  .setPublicID('sample');

const App = () => {
  // @ts-ignore
  return <CldImg transformation={img} plugins={[accessibility]}/>
};

export default App
