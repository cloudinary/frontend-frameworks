#React-library

##Overview
This is our react library. The objective of this layer is to use our html
library to render an image.

##Install
Since this library is not on npm, we will install/pack this repo locally and install it on a sample angular app.

1. clone repo
2. npm install (make sure that the html library has been built)
3. npm run build
4. npm link/pack to use build in external react library

##Note
This repo contains a temporary user sample for testing.
To use the sample project-
1. npm start to trigger build and live reload
2. cd into /example and run npm install/start to trigger sample user example


## Usage

```tsx
import React, { Component } from 'react'

import { CldImg } from '@cloudinary/react'
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
  return <CldImg transformation={img}/>
};
```
