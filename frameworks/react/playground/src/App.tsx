import React from 'react'
import { AdvancedImage, accessibility, responsive, lazyload, placeholder } from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";


//This is our playground and can be used to test library
const App = () => {
  let img = new CloudinaryImage('sample', { cloudName: 'demo'});

  return (
    <div>
      <AdvancedImage cldImg={img} plugins={[responsive(100)]}/>
    </div>
  )
};

export default App
