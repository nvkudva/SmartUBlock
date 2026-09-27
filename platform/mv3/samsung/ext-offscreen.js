/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2025-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

// Samsung Internet may not expose the offscreen API. Degrade the same way
// Safari does: custom and imported filter compilation becomes unavailable,
// while the bundled rulesets keep working.

export const supportsOffscreenDocument = chrome.offscreen !== undefined;

export async function createOffscreenDocument(path) {
    if ( supportsOffscreenDocument === false ) { return; }
    return chrome.offscreen.createDocument({
        url: path,
        reasons: [ 'WORKERS' ],
        justification: 'To compile custom & imported filters in a modular way from service worker (service workers do not allow dynamic module import)',
    });
}

export async function closeOffscreenDocument() {
    if ( supportsOffscreenDocument === false ) { return; }
    return chrome.offscreen.closeDocument();
}
