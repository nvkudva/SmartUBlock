<h1 align="center">
<sub>
<img src="platform/mv3/samsung/img/smartublock.svg" height="38" width="38">
</sub>
SmartUblock
</h1>

A lightweight ad and tracker blocker for **Samsung Internet** on Android, built
on [uBlock Origin Lite](https://github.com/uBlockOrigin/uBOL-home) (uBOL).

SmartUblock is a Manifest V3 extension. It uses the browser's
`declarativeNetRequest` API, so it needs no broad background processing and
stays light on CPU and memory.

## Credits

SmartUblock is a fork of **uBlock Origin Lite**, created by
[Raymond Hill (gorhill)](https://github.com/gorhill) and the
[uBlock Origin contributors](https://github.com/gorhill/uBlock/graphs/contributors).
The blocking engine, filter compilation and most of the code are their work.
The filter lists come from [uAssets](https://github.com/uBlockOrigin/uAssets),
[EasyList](https://easylist.to/), [EasyPrivacy](https://easylist.to/),
[Peter Lowe's list](https://pgl.yoyo.org/adservers/), the
[URLhaus](https://urlhaus.abuse.ch/) malware list and AdGuard.

SmartUblock is not affiliated with or endorsed by uBlock Origin or its author.
If you can, use the original: [uBlock Origin](https://github.com/gorhill/uBlock)
on Firefox and [uBOL](https://github.com/uBlockOrigin/uBOL-home) on Chromium.

## What differs from uBOL

- Samsung Internet build target (`samsung` platform in `tools/make-mv3.sh`).
- Manifest without `offscreen` and keyboard `commands`. `userScripts` is an
  optional permission. Samsung Internet may not expose these APIs.
- Custom and imported filter lists need `chrome.offscreen`. Without it, only
  the bundled rulesets run.
- Rebranded name, author and icons (`platform/mv3/samsung/brand.json`,
  `platform/mv3/samsung/img/`).
- Refreshed popup look: rounded filtering-mode slider and round knob.

## Build

    tools/make-mv3.sh samsung <version>

The package lands in `dist/build/uBOLite_<version>.samsung.zip`. The unpacked
extension is in `dist/build/uBOLite.samsung/`. The version must follow the
Chromium rule: up to four numbers, each at most 65535, no leading zeros.

The `Samsung Internet build` GitHub workflow builds the same package on each
push to the `samsung` branch.

## Test

- **Desktop Chrome:** open `chrome://extensions`, turn on Developer mode, click
  "Load unpacked" and pick `dist/build/uBOLite.samsung`. Open the service
  worker console and check for errors.
- **Samsung Internet:** turn on developer mode in the browser's settings and
  sideload the zip, or submit it to the Galaxy Store as a test release.

See [platform/mv3/samsung/README.md](platform/mv3/samsung/README.md) for more.

## License

GNU General Public License v3.0. See [LICENSE.txt](LICENSE.txt).

Copyright (c) 2014-present Raymond Hill and uBlock Origin contributors
(original work). Copyright (c) 2026-present nvkudva (SmartUblock changes).

The source of every published build must stay available under the same
license.
