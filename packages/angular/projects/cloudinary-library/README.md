Cloudinary Angular SDK
=========================
## About
The Cloudinary Angular SDK allows you to quickly and easily integrate your application with Cloudinary.
Effortlessly optimize and transform your cloud's assets.

#### Note
This Readme provides basic installation and usage information.
For the complete documentation, see the [Angular SDK Reference](https://cloudinary.com/documentation/sdks/js/frontend-frameworks/AngularSDK).


## Table of Contents
- [Cloudinary Angular SDK](#cloudinary-angular-sdk)
  - [About](#about)
      - [Note](#note)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Version Support](#version-support)
  - [Installation](#installation)
    - [Install using your favorite package manager (yarn, npm)](#install-using-your-favorite-package-manager-yarn-npm)
  - [Usage](#usage)
    - [Setup](#setup)
    - [Transform and Optimize Assets](#transform-and-optimize-assets)
    - [Generate Image and Video HTML Tags](#generate-image-and-video-html-tags)
    - [Advanced Plugin Features](#advanced-plugin-features)
    - [File upload](#file-upload)
  - [Contributions](#contributions)
  - [Get Help](#get-help)
  - [About Cloudinary](#about-cloudinary)
  - [Additional Resources](#additional-resources)
  - [License](#license)

## Key Features
- [Transform](https://cloudinary.com/documentation/angular_video_manipulation#video_transformation_examples) and
 [optimize](https://cloudinary.com/documentation/angular_image_manipulation#image_optimizations) assets.
- Generate [image](https://cloudinary.com/documentation/angular_image_manipulation#deliver_and_transform_images) and
 [video](https://cloudinary.com/documentation/angular_video_manipulation#video_element) tags.

## Version Support
| SDK Version   | ng 10.0 | ng 11.0 | ng 12.0 | ng 13.0 | ng 14.0 | ng 15.0 | ng 16.0 & up |
|---------------|---------|---------|---------|---------|---------|---------|--------------|
| 1.x.x         | V       | V       | V       | V       | V       | V       |              |
| 2.x.x         |         |         | V       | V       | V       | V       | V            |

New features will only be added to version 2.x.

## Installation
### Install using your favorite package manager (yarn, npm)
```bash
npm i @cloudinary/url-gen @cloudinary/ng --save

```
Or
```bash
yarn add @cloudinary/url-gen @cloudinary/angular --save
```

## Usage
### Setup
```tsx
// In your app.module.ts:

// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';

imports: [
  ...,
  CloudinaryModule
],
```

### Transform and Optimize Assets
- [See full documentation](https://cloudinary.com/documentation/angular_image_manipulation)

```tsx
import {CloudinaryImage} from '@cloudinary/url-gen/assets/CloudinaryImage';

export class AppComponent implements OnInit{
  img: CloudinaryImage;

  ngOnInit() {
     const myCld = new Cloudinary({ cloudName: 'demo'});
     this.img = myCld().image('sample');
  }
}
```

In your view add the component with your transformation
```html
<advanced-image [cldImg]="this.img"></advanced-image>
```

### Generate Image and Video HTML Tags
    - Use <advanced-image> to generate image tags
    - Use <advanced-video> to generate video tags

### Advanced Plugin Features
- [See full documentation](https://cloudinary.com/documentation/angular_integration#plugins)
<br/><br/>
We recommend the following order when using our plugins to achieve the best results: 
<br/><br/>

```js
import { CloudinaryImage } from "@cloudinary/url-gen";
import {
  lazyload,
  responsive,
  accessibility,
  placeholder
} from "@cloudinary/ng";

export class AppComponent {
  cloudinaryImage = new CloudinaryImage("sample", { cloudName: "demo" });
  plugins = [lazyload(),responsive(), accessibility(), placeholder()];
}
```

```html
<advanced-image [cldImg]="cloudinaryImage" [plugins]="plugins">
```

You can omit any plugin, but the order from above should remain.

### File upload
This SDK does not provide file upload functionality, however there are [several methods of uploading from the client
 side](https://cloudinary.com/documentation/angular_image_and_video_upload).

## Contributions
- Ensure tests run locally (```npm run test```)
- Open a PR and ensure Travis tests pass

## Get Help
If you run into an issue or have a question, you can either:
- [Open a Github issue](https://github.com/cloudinary/frontend-frameworks/issues)  (for issues related to the SDK)
- [Open a support ticket](https://cloudinary.com/contact) (for issues related to your account)

## About Cloudinary
Cloudinary is a powerful media API for websites and mobile apps alike, Cloudinary enables developers to efficiently manage, transform, optimize, and deliver images and videos through multiple CDNs. Ultimately, viewers enjoy responsive and personalized visual-media experiences—irrespective of the viewing device.


## Additional Resources
- [Cloudinary Transformation and REST API References](https://cloudinary.com/documentation/cloudinary_references): Comprehensive references, including syntax and examples for all SDKs.
- [MediaJams.dev](https://mediajams.dev/): Bite-size use-case tutorials written by and for Cloudinary Developers
- [DevJams](https://www.youtube.com/playlist?list=PL8dVGjLA2oMr09amgERARsZyrOz_sPvqw): Cloudinary developer podcasts on YouTube.
- [Cloudinary Academy](https://training.cloudinary.com/): Free self-paced courses, instructor-led virtual courses, and on-site courses.
- [Code Explorers and Feature Demos](https://cloudinary.com/documentation/code_explorers_demos_index): A one-stop shop for all code explorers, Postman collections, and feature demos found in the docs.
- [Cloudinary Roadmap](https://cloudinary.com/roadmap): Your chance to follow, vote, or suggest what Cloudinary should develop next.
- [Cloudinary Facebook Community](https://www.facebook.com/groups/CloudinaryCommunity): Learn from and offer help to other Cloudinary developers.
- [Cloudinary Account Registration](https://cloudinary.com/users/register/free): Free Cloudinary account registration.
- [Cloudinary Website](https://cloudinary.com): Learn about Cloudinary's products, partners, customers, pricing, and more.


## License
Released under the MIT license.

