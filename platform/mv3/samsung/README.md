# Samsung Internet port

A rebranded build of uBlock Origin Lite (MV3) for Samsung Internet on
Android, published through the Galaxy Store.

## Build

    tools/make-mv3.sh samsung 2026.9.27

The package lands in `dist/build/uBOLite_<version>.samsung.zip`. The
`Samsung Internet build` GitHub workflow does the same on each push to
the `samsung` branch.

## What differs from the Chromium build

- `manifest.json` drops `offscreen` and keyboard `commands`, and makes
  `userScripts` optional. Samsung Internet may not expose either API.
- `ext-offscreen.js` no-ops when `chrome.offscreen` is missing. Bundled
  rulesets keep working; custom and imported lists need the API.
- `patch-extension.js` renames the extension from `brand.json`.

## Before submitting to the Galaxy Store

- Replace the icons in `img/` with your own. Put them in
  `platform/mv3/samsung/img/` and the build copies them over.
- Keep `LICENSE.txt` and publish this source. GPLv3 requires both.
