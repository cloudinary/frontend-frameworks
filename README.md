# Cloudinary Frontend Frameworks

## About this project

This project contains SDKs designed to work with [Cloudinary url-gen](https://github.com/cloudinary/js-url-gen). </br>
These SDKs render CloudinaryImage or CloudinaryVideo objects into the DOM.

### Packages contained within this project:
<br />
 
- The React SDK used to render an image & video component. [NPM](https://www.npmjs.com/package/@cloudinary/react)  |     {@link ReactSDK|Reference} 
- The Angular SDK used to render an image & video component. [NPM](https://www.npmjs.com/package/@cloudinary/ng
) |  {@link AngularSDK|Reference} 
 
                                                
Each SDK also contains advanced features in the form of plugins, which extend the native HTMLImage and HTMLVideo elements.

- {@link accessibility|accessibility} - Used to make your images more accessible to your users with visual disabilities. 
- {@link lazyload|lazyload} - Used to delay loading images if they are not yet visible on the screen.
- {@link placeholder|placeholder} - Used to display a lightweight version of an image while the target image is downloading.
- {@link responsive|responsive} - Used to resize your images automatically based on the viewport size.

## Development setup
To build and link project: 
- clone project
- npm run quickstart


## Installation
To get started, install the npm client package of your choice along with our base package.
For example, to use Cloudinary in a [React](https://cloudinary.com/documentation/react2_integration) environment, the following packages should be installed:
   
```bash
npm i @cloudinary/react @cloudinary/url-gen
```

**Note**: To use [Angular](https://cloudinary.com/documentation/angular2_integration) install `@cloudinary/ng`. 

## Simple usage
The following is a simple example using [React](https://cloudinary.com/documentation/react2_integration).
For more information on React and other frameworks, navigate to the specific reference using the **Packages** menu. 
```javascript
// Import the Cloudinary class, and the plugins you want to use.
// In this case, we import a Cloudinary image type, accessibility and responsive.

import React, { Component } from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage, accessibility, responsive } from '@cloudinary/react';

// Once per project/app - configure your instance.
// See the documentation in @cloudinary/url-gen for more information. 
const myCld = new Cloudinary({ cloudName: 'demo'});

// Render your component.
 const App = () => {
    // Create your image.
    // This creates a new image object:
    let img = myCld().image('sample');
    return (
        <div>
            <AdvancedImage cldImg={img} plugins={[responsive(), accessibility()]}/>
        </div>
    )
  };
```

## Plugin Order

<div>
We recommend the following order when using our plugins to achieve the best results: 
<br/><br/>

```javascript
<AdvancedImage plugins={[lazyload(),responsive(), accessibility(), placeholder()]}/>
```

You can omit any plugin, but the order from above should remain.
</div>
