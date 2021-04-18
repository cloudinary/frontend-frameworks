# Cloudinary Vue 3 SDK

## Overview

This sdk includes an AdvancedImage & AdvancedVideo components that render cloudinary media assets and support
multiple [plugins](https://github.com/cloudinary/frontend-frameworks "Cloudinary frontend frameworks on Github").

## Install

npm i @cloudinary/vue

## Development

1. clone repo
2. npm run quickstart

## Usage

```vue
<template>
    <AdvancedImage cldImg="imd"/>
</template>

<script>
    import {defineComponent} from 'vue';
    import {CloudinaryImage} from "@cloudinary/base";
    import {AdvancedImage} from '@cloudinary/vue';

    export default defineComponent({
        name: 'App',
        components: {
            AdvancedImage
        },
        data: function () {
            return {
                img: new CloudinaryImage('sample', {cloudName: 'demo'}),
            };
        }
    });
</script>
```
