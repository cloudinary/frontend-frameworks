import React from 'react'
import { CldImg, accessibility, responsive, lazyload, placeholder } from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";


//This is our playground and can be used to test library
const App = () => {
  let img = new CloudinaryImage('sample', { cloudName: 'demo'});

  return (
    <div>
      <CldImg transformation={img} plugins={[responsive(100)]}/>
    </div>
  )
};

export default App
