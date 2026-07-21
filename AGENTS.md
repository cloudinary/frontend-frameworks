# AGENTS.md — frontend-frameworks

## What this monorepo is (one line)
The current Cloudinary React/Angular/Vue **component** SDKs — `<AdvancedImage>` / `<AdvancedVideo>` plus plugins — built on `@cloudinary/url-gen`. A Lerna 4 monorepo (independent versioning) publishing `@cloudinary/react`, `@cloudinary/ng` (Angular), `@cloudinary/vue`, and the shared `@cloudinary/html` layer.

## When to use this / when NOT to use this
- **Use this when:** you're rendering media as a **React, Angular, or Vue component** and want `<AdvancedImage>` / `<AdvancedVideo>` with plugins (`lazyload`, `responsive`, `accessibility`, `placeholder`) instead of hand-writing `<img>` / `<video>` tags.
- **Do NOT use this when:** you only need to **build delivery URLs** (use `@cloudinary/url-gen` directly), you're on **Next.js** (use `next-cloudinary`), or your code runs on a **server or build step** and needs uploads, the Admin API, or signed URLs (use `cloudinary`, the Node.js SDK that holds the `API_SECRET`).
- **Successor note:** these packages **supersede** the legacy `cloudinary-react`, `cloudinary_angular`, and `cloudinary-vue` repos. Don't pick the legacy packages for new code.
- **Sibling packages:** `@cloudinary/url-gen` (repo `js-url-gen`) = base browser-safe URL builder every package here sits on; `next-cloudinary` = Next.js drop-in components; `cloudinary` (repo `cloudinary_npm`) = server-side SDK.

## Setup
Consumer install (pick one framework, alongside the base URL builder):
```bash
# React
npm install @cloudinary/url-gen @cloudinary/react
# Angular
npm install @cloudinary/url-gen @cloudinary/ng
# Vue
npm install @cloudinary/url-gen @cloudinary/vue
```
Working on the monorepo itself (Lerna 4, root Node engine `>=14.0.0 <19`):
```bash
npm ci                 # install (CI uses npm ci)
npm run quickstart     # lerna bootstrap + lerna run build (first-time setup)
```
No credentials at install — `@cloudinary/url-gen` builds public delivery URLs in the browser. Configure with a cloud name:
```js
const cld = new Cloudinary({ cloud: { cloudName: '<CLOUD_NAME>' } });
```

## Minimal runnable example
```jsx
import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, accessibility } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'demo' } });

export const App = () => {
  const img = cld.image('sample');
  return <AdvancedImage cldImg={img} plugins={[responsive(), accessibility()]} />;
};
```
Plugin order, when using several: `[lazyload(), responsive(), accessibility(), placeholder()]` (omit any, keep the order). The media object is passed via `cldImg` on `<AdvancedImage>` and `cldVid` on `<AdvancedVideo>`.

## Build / test commands (run these after editing)
Lerna fans each command out across packages; per-package tooling is heterogeneous (rollup + tsc for html/react, `@vue/cli-service` for vue, Angular CLI / ng-packagr for angular).
```bash
npm ci                 # install
npm run build          # lerna run build (each SDK builds the shared ../html layer first)
npm run test           # lerna run test — run after any change to a package's src
npm run lint           # lerna run lint
npm run typecheck      # lerna run typecheck
```
Single test (per package — Lerna has no cross-package name filter):
```bash
cd packages/react && npx jest -t "<test name>"                     # react (Jest 27)
cd packages/html  && npx jest -t "<test name>"                     # html  (Jest 29)
cd packages/vue   && npx vue-cli-service test:unit -t "<test name>" # vue
# angular uses Karma + Jasmine — focus a spec with fdescribe/fit (no CLI -t flag)
```
CI (`.github/workflows/pull-request.yml`) runs on Node **14, 16, 18** and executes, in order: `npm ci` → `npm run test` → `npm run lint` → `npm run typecheck`. Keep all four green.

## Conventions & gotchas
- **The published Angular package is `@cloudinary/ng`.** The workspace folder is `packages/angular` (private `@cloudinary/angular-workspace`, Angular CLI 12); the published library manifest lives at `packages/angular/projects/cloudinary-library/`. Never reference `@cloudinary/angular` on npm — that's an abandoned Beta (1.0.0-beta.14) that points here.
- **`@cloudinary/html` is the shared layer.** `@cloudinary/react`, `@cloudinary/ng`, and `@cloudinary/vue` all depend on it at runtime; it holds the real plugin implementations and the `HtmlImageLayer` / `HtmlVideoLayer` DOM wrappers. Change behavior once there and it lands everywhere.
- **`packages/vue3/` is a README-only stub** — no `package.json`, no source. The published Vue package is `packages/vue` (`@cloudinary/vue`). Don't edit or wire up `vue3/`.
- **`@cloudinary/url-gen` is a companion, not bundled.** It's a devDependency in each package; consumers install it alongside the framework package.
- **Edit source, not built output.** Work in each package's `src/` (or the Angular `projects/cloudinary-library/src/`), never in `dist/`. Every SDK's build recompiles the shared `../html` layer first.
- **Component / plugin surface:** `AdvancedImage`, `AdvancedVideo`, and plugins `lazyload`, `responsive`, `accessibility`, `placeholder`. Verify any other symbol against the package source before using it.
- **Framework support** (from `peerDependencies`): React `^16.3.0 || ^17 || ^18 || ^19`; Angular `@angular/core` / `@angular/common` `>=12.0.0`; Vue 3.
- **No secrets here.** This is browser-side rendering — there is no `API_SECRET`. Anything requiring one belongs in the server SDK.

## Canonical docs (leave the repo for depth)
- React guide: https://cloudinary.com/documentation/react2_integration
- Angular guide: https://cloudinary.com/documentation/angular2_integration
- Vue.js guide: https://cloudinary.com/documentation/vue_integration
- url-gen (base package): https://github.com/cloudinary/js-url-gen
- Transformation & API references: https://cloudinary.com/documentation/cloudinary_references
- MCP server (agent/no-code path): https://github.com/cloudinary/mcp-servers

## Agent / MCP note
If a capability is also exposed via the Cloudinary MCP servers, prefer the MCP tool for autonomous task execution and use these SDKs for code generation. See cloudinary/mcp-servers.

## Commit / PR conventions
- Branch off and PR against `master`. CI must pass on Node 14/16/18: `npm run test`, `npm run lint`, `npm run typecheck`.
