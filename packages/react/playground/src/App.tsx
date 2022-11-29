import React from 'react'
import './App.css'
import {
  AdvancedImage,
  accessibility,
  responsive,
  lazyload,
  placeholder
} from '@cloudinary/react/src';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'

// This is our playground and can be used to test library
function App() {
  const img = new CloudinaryImage('sample', { cloudName: 'demo' })

  return (
    <div>
      <AdvancedImage cldImg={img} />
    </div>
  )
}

export default App
