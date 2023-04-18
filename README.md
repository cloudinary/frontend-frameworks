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
import React from 'react'
// Cloudinary is used to configure your account and generate urls for your media assets
import {Cloudinary} from "@cloudinary/url-gen";
// Import the cloudinary media component (AdvancedImage / AdvancedVideo),
// and the plugins you want to use.
import {AdvancedImage, accessibility, responsive} from '@cloudinary/react';

// Once per project/app - configure your instance.
// See the documentation of @cloudinary/url-gen for more information.
const myCld = new Cloudinary({cloud: {cloudName: 'demo'}});

export const App = () => {
  // Create a new image object:
  const img = myCld.image('sample');

  // Render your component.
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
<AdvancedImage plugins={[lazyload(), responsive(), accessibility(), placeholder()]}/>
```

You can omit any plugin, but the order from above should remain.
</div>


## Contributors

Repository is using [Conventional Commits](https://www.conventionalcommits.org/). To publish packages please read instructions in [sdk-scripts](https://github.com/CloudinaryLtd/sdk-scripts/blob/master/src/release/js/frontend-frameworks/README.md).
