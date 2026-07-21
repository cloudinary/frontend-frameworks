# Cloudinary frontend framework SDKs

[![license](https://img.shields.io/github/license/cloudinary/frontend-frameworks.svg)](https://github.com/cloudinary/frontend-frameworks/blob/master/LICENSE)
[![CI](https://github.com/cloudinary/frontend-frameworks/actions/workflows/pull-request.yml/badge.svg)](https://github.com/cloudinary/frontend-frameworks/actions/workflows/pull-request.yml)

This monorepo publishes Cloudinary's browser component SDKs — `@cloudinary/react` (1.14.4), `@cloudinary/ng` (2.1.6, the Angular package), and `@cloudinary/vue` (1.13.4, Vue 3) — plus the shared `@cloudinary/html` (1.13.5) layer they build on. Each renders Cloudinary images and video as framework components, `<AdvancedImage>` and `<AdvancedVideo>`, on top of the [`@cloudinary/url-gen`](https://github.com/cloudinary/js-url-gen) URL builder, which runs in the browser and holds no API secret. `@cloudinary/react` supports React `^16.3.0 || ^17 || ^18 || ^19`; `@cloudinary/ng` supports `@angular/core` and `@angular/common` `>=12.0.0`; `@cloudinary/vue` supports Vue 3.

## Installation

Install the framework package you need alongside the base `@cloudinary/url-gen`.

React:

```bash
npm install @cloudinary/url-gen @cloudinary/react
```

Angular (the published package is `@cloudinary/ng`, not `@cloudinary/angular`):

```bash
npm install @cloudinary/url-gen @cloudinary/ng
```

Vue:

```bash
npm install @cloudinary/url-gen @cloudinary/vue
```

## Configuration

These packages build public delivery URLs in the browser and take no API key or API secret. Configure a `Cloudinary` instance from `@cloudinary/url-gen` with your cloud name (find it in the Console dashboard):

```js
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({ cloud: { cloudName: '<CLOUD_NAME>' } });
```

The config shape is `{ cloud: { cloudName: '<CLOUD_NAME>' } }` — not the `CLOUDINARY_URL` environment variable, which the server-side SDKs use. Uploads, the Admin API, and signed URLs need the API secret and belong on a server; use the [`cloudinary`](https://github.com/cloudinary/cloudinary_npm) Node.js SDK there, and keep the API secret out of client-side code and version control.

## Quick examples

### Transform and optimize an image (React)

Build a `CloudinaryImage` with `cld.image()`, apply transformations, then pass it to `<AdvancedImage>` as `cldImg`. This resizes to a 100x150 fill crop and lets Cloudinary pick the format and quality for the requesting browser (`f_auto`, `q_auto`):

```jsx
import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'demo' } });

export const App = () => {
  const img = cld.image('sample')
    .resize(fill().width(100).height(150))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));

  return <AdvancedImage cldImg={img} />;
  // renders https://res.cloudinary.com/demo/image/upload/c_fill,h_150,w_100/f_auto/q_auto/sample
};
```

### Render an image with plugins (Angular)

Register `CloudinaryModule` from `@cloudinary/ng`, then use the `<advanced-image>` component with a `cldImg` input. Plugins are passed to the `plugins` input as an array, and their order matters (recommended: `lazyload`, `responsive`, `accessibility`, `placeholder`):

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CloudinaryModule } from '@cloudinary/ng';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, CloudinaryModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { lazyload, responsive } from '@cloudinary/ng';

@Component({
  selector: 'app-root',
  template: `<advanced-image [cldImg]="img" [plugins]="plugins"></advanced-image>`,
})
export class AppComponent {
  cld = new Cloudinary({ cloud: { cloudName: 'demo' } });
  img = this.cld.image('sample'); // renders .../demo/image/upload/sample
  plugins = [lazyload(), responsive()];
}
```

### Render a video (Vue)

Build a `CloudinaryVideo` with `cld.video()` and render it with `<AdvancedVideo>`, passing the media object via the `cldVid` prop. Native video attributes such as `controls` pass straight through to the underlying `<video>` element:

```vue
<script setup>
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/vue';

const cld = new Cloudinary({ cloud: { cloudName: 'demo' } });
const vid = cld.video('dog');
// plays https://res.cloudinary.com/demo/video/upload/dog
</script>

<template>
  <AdvancedVideo :cldVid="vid" controls />
</template>
```

## For AI agents

These are the current Cloudinary React, Angular, and Vue component SDKs — `@cloudinary/react`, `@cloudinary/ng`, and `@cloudinary/vue` — for rendering media as framework components in the browser. They build on the base `@cloudinary/url-gen` URL builder and supersede the legacy class-based repos `cloudinary-react`, `cloudinary_angular`, and `cloudinary-vue`; don't pick those for new code. The Angular package is `@cloudinary/ng` — `@cloudinary/angular` (stuck at 1.0.0-beta.14) is an abandoned Beta that points to `@cloudinary/ng`. For tasks these packages don't cover, route to the correct sibling:

| Task | Package |
|---|---|
| Build delivery URLs with no component layer | [`@cloudinary/url-gen`](https://github.com/cloudinary/js-url-gen) |
| Drop-in Next.js components | [`next-cloudinary`](https://github.com/cloudinary-community/next-cloudinary) |
| Server-side upload, Admin API, signed URLs (holds the API secret) | [`cloudinary`](https://github.com/cloudinary/cloudinary_npm) |
| Run Cloudinary operations as agent tools | [Cloudinary MCP servers](https://github.com/cloudinary/mcp-servers) |

## Links

- [React SDK guide](https://cloudinary.com/documentation/react2_integration)
- [Angular SDK guide](https://cloudinary.com/documentation/angular2_integration)
- [Vue.js SDK guide](https://cloudinary.com/documentation/vue_integration)
- [`@cloudinary/url-gen` (base URL builder)](https://github.com/cloudinary/js-url-gen)
- [Transformation and API references](https://cloudinary.com/documentation/cloudinary_references)
- [Documentation llms.txt index](https://cloudinary.com/documentation/llms.txt)
- Packages on npm: [`@cloudinary/react`](https://www.npmjs.com/package/@cloudinary/react) · [`@cloudinary/ng`](https://www.npmjs.com/package/@cloudinary/ng) · [`@cloudinary/vue`](https://www.npmjs.com/package/@cloudinary/vue)

Released under the MIT license.
