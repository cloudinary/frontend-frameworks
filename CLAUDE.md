@AGENTS.md

# CLAUDE.md — frontend-frameworks

## Claude Code-specific notes

**Primary reference:** `AGENTS.md` (imported above) covers setup, build/test commands, conventions, and gotchas. Read it before touching any file.

## What this repo is

A Lerna 4 monorepo (independent versioning) publishing Cloudinary's browser **component** SDKs: `@cloudinary/react`, `@cloudinary/ng` (Angular), and `@cloudinary/vue`, plus the shared `@cloudinary/html` layer. Each renders `<AdvancedImage>` / `<AdvancedVideo>` on top of `@cloudinary/url-gen`. This is browser-side rendering — there is no `API_SECRET` in this repo.

## Key constraints

- **The Angular package is `@cloudinary/ng`** — never `@cloudinary/angular` (an abandoned Beta on npm). The published library lives at `packages/angular/projects/cloudinary-library/`; `packages/angular/package.json` is the private Angular CLI 12 workspace.
- **`packages/vue3/` is a README-only stub** (no source). The published Vue package is `packages/vue` (`@cloudinary/vue`).
- **`@cloudinary/html` is the shared layer** all three framework SDKs depend on at runtime — it holds the plugin implementations and the DOM layer wrappers. Behavior changes there propagate everywhere.
- **Edit `src/`, not `dist/`.** Each SDK's build recompiles the shared `../html` layer first.
- **`@cloudinary/url-gen` is a companion install**, not bundled — examples install it alongside the framework package.
- **Component / plugin surface:** `AdvancedImage`, `AdvancedVideo`, and plugins `lazyload`, `responsive`, `accessibility`, `placeholder`. Verify any other symbol against package source. The media object is passed via `cldImg` (`<AdvancedImage>`) / `cldVid` (`<AdvancedVideo>`); plugin array order matters.

## Verified build/test commands

```bash
npm ci                 # install (CI uses npm ci)
npm run quickstart     # lerna bootstrap + build all packages (first-time setup)
npm run build          # lerna run build
npm run test           # lerna run test — run after any src change
npm run lint           # lerna run lint
npm run typecheck      # lerna run typecheck

# Single test (per package — no cross-package name filter):
cd packages/react && npx jest -t "<test name>"
cd packages/vue   && npx vue-cli-service test:unit -t "<test name>"
cd packages/html  && npx jest -t "<test name>"
# angular: Karma + Jasmine — focus a spec with fdescribe/fit
```

CI (`.github/workflows/pull-request.yml`) runs on Node 14/16/18: `npm ci` → `npm run test` → `npm run lint` → `npm run typecheck`. Keep all green. Branch off and PR against `master`.
