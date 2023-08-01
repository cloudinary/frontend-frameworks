Cloudinary Vue SDK
=========================
## About
The Cloudinary Vue SDK allows you to quickly and easily integrate your application with Cloudinary.
Effortlessly optimize and transform your cloud's assets.

#### Note
This Readme provides basic installation and usage information.

## Table of Contents
- [Cloudinary Vue 3 SDK](#cloudinary-vue-3-sdk)
  - [About](#about)
      - [Note](#note)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Version Support](#version-support)
  - [Installation](#installation)
    - [Install using your favorite package manager (yarn, npm)](#install-using-your-favorite-package-manager-yarn-npm)
  - [Usage Example](#usage-example)
    - [Setup](#setup)
    - [Generate Image and Video elements](#generate-image-elements)
    - [Advanced Plugin Features](#advanced-plugin-features)
    - [File upload](#file-upload)
  - [Contributions](#contributions)
  - [Get Help](#get-help)
  - [About Cloudinary](#about-cloudinary)
  - [Additional Resources](#additional-resources)
  - [License](#license)

## Key Features
- [Transform](https://cloudinary.com/documentation/react_video_manipulation#video_transformation_examples) and
  [optimize](https://cloudinary.com/documentation/react_image_manipulation#image_optimizations) assets.
- Generate [image](https://cloudinary.com/documentation/react_image_manipulation#deliver_and_transform_images) and
  [video](https://cloudinary.com/documentation/react_video_manipulation#video_element) tags.

## Version Support
| SDK Version   | Vue 3.x |
|---------------|---------|
| 1.0.0 & up    | V       |

## Installation
### Install using your favorite package manager (yarn, npm)
```bash
npm i @cloudinary/url-gen @cloudinary/vue

```
Or
```bash
yarn add @cloudinary/url-gen @cloudinary/vue
```

## Usage Example
### Setup
```vue
<script type="module">
import { AdvancedImage, responsive } from "@cloudinary/vue"
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";

export default {
  components: {
    AdvancedImage
  },
  data() {
    return {
      plugins: [responsive({steps: 100})],
      cldImg: new CloudinaryImage(
          "sample",
          {cloudName: "demo"}
      )
    };
  }
};
</script>

<template>
  <div>
    <p>text</p>
    <AdvancedImage :cldImg="cldImg" :plugins="plugins" />
  </div>
</template>
```

### Generate Image and Video elements
- Use <AdvancedImage> to generate image tags
- Use <AdvancedVideo> to generate image tags

### Advanced Plugin Features
- [See full documentation](https://cloudinary.com/documentation/react_integration#plugins)

We recommend the following order when using our plugins to achieve the best results:
```js
[lazyload(), responsive(), accessibility(), placeholder()]
```

You can omit any plugin, but the order from above should remain.

### File upload
This SDK does not provide file upload functionality, however there are [several methods of uploading from the client side](https://cloudinary.com/documentation/vue_image_and_video_upload).

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
