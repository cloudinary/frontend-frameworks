# React-library

## Overview
This is our React library. The objective of this layer is to use our html
library to render an image.

## Install
Since this library is not on npm, we will install/pack this repo locally and install it on a sample angular app.

1. clone repo
2. npm install
3. npm run build
4. npm link/pack to use build in external react library

## Note
This repo contains a temporary user sample for testing.
To use the sample project-
1. npm start to trigger build and live reload
2. cd into /example and run npm install/start to trigger sample user example


## Usage

```tsx
import React, { Component } from 'react'

import { AdvancedImage } from '@cloudinary/react'
import {CloudinaryImage} from '@cloudinary/url-gen';

let img = new CloudinaryImage()
const myCld = new Cloudinary({ cloudName: 'demo'});
let img = myCld().image('sample');

const App = () => {
  return <AdvancedImage cldImg={img}/>
};
```
