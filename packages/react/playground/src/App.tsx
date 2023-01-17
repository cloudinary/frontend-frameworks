import React from 'react'
import './App.css'
import {
  AdvancedImage,
  AdvancedVideo,
  accessibility,
  responsive,
  lazyload,
  placeholder
} from '@cloudinary/react/src'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { CloudinaryVideo } from '@cloudinary/url-gen/assets/CloudinaryVideo'

// This is our playground and can be used to test library
function App() {
  const img = new CloudinaryImage('sample', { cloudName: 'demo' })

  const cldVid = new CloudinaryVideo(
    'docs/walking_talking',
    { cloudName: 'demo' },
    { analytics: false }
  )

  return (
    <div>
      <h1>AdvancedImage</h1>
      <AdvancedImage cldImg={img} plugins={[responsive({ steps: 100 })]} />
      <h1>AdvancedVideo</h1>
      <AdvancedVideo cldVid={cldVid} controls loop width={600} />
    </div>
  )
}

export default App
