# Cloudinary Svelte SDK

## Overview
This sdk includes an AdvancedImage component that renders an image and supports multiple [plugins](https://github.com/cloudinary/frontend-frameworks "Cloudinary frontend frameworks on Github").

## Install
npm i @cloudinary/svelte

## Development
1. clone repo
2. npm run quickstart

## Usage

```sveltehtml
<script>
    import {CloudinaryImage} from '@cloudinary/base';
    import { AdvancedImage } from '@cloudinary/svelte';
    const img = new CloudinaryImage('sample', {cloudName: 'demo'});
</script>

<AdvancedImage cldImg={img}/>
```
