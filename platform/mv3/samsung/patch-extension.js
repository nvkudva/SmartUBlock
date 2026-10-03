/*******************************************************************************

    Samsung Internet port of uBlock Origin Lite
    Copyright (C) 2014-present Raymond Hill and contributors

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

// Rebrand the package for the Galaxy Store. The uBlock Origin name belongs
// to its author, so a fork published elsewhere must carry its own name.

import fs from 'fs/promises';
import path from 'path';
import process from 'process';

/******************************************************************************/

const commandLineArgs = (( ) => {
    const args = Object.create(null);
    for ( const arg of process.argv.slice(2) ) {
        const pos = arg.indexOf('=');
        if ( pos === -1 ) {
            args[arg] = '';
        } else {
            args[arg.slice(0, pos)] = arg.slice(pos+1);
        }
    }
    return args;
})();

/******************************************************************************/

async function readJSON(fpath) {
    return JSON.parse(await fs.readFile(fpath, { encoding: 'utf8' }));
}

async function writeJSON(fpath, data) {
    await fs.writeFile(fpath, JSON.stringify(data, null, 2));
}

async function main() {
    const packageDir = commandLineArgs.packageDir;
    const brand = await readJSON(commandLineArgs.brand);

    const manifestPath = `${packageDir}/manifest.json`;
    const manifest = await readJSON(manifestPath);
    manifest.author = brand.author;
    manifest.short_name = brand.shortName;
    await writeJSON(manifestPath, manifest);

    const rebrand = text => text.replace(/(?<![\/\w-])(?:uBlock Origin Lite|uBO Lite|uBlock Origin|uBlock|uBOL|uBO)(?![\w-])/gi, brand.name);

    for ( const entry of await fs.readdir(packageDir) ) {
        if ( entry.endsWith('.html') === false ) { continue; }
        const htmlPath = `${packageDir}/${entry}`;
        const html = await fs.readFile(htmlPath, { encoding: 'utf8' });
        await fs.writeFile(htmlPath, rebrand(html));
    }

    const localesDir = `${packageDir}/_locales`;
    for ( const locale of await fs.readdir(localesDir) ) {
        const messagesPath = path.join(localesDir, locale, 'messages.json');
        const messages = await readJSON(messagesPath).catch(( ) => null);
        if ( messages === null ) { continue; }
        for ( const [ key, entry ] of Object.entries(messages) ) {
            for ( const field of [ 'message', 'description' ] ) {
                if ( typeof entry[field] !== 'string' ) { continue; }
                entry[field] = rebrand(entry[field]);
            }
        }
        if ( messages.extName ) {
            messages.extName.message = brand.name;
        }
        if ( locale === 'en' && messages.extShortDesc ) {
            messages.extShortDesc.message = brand.description;
        }
        await writeJSON(messagesPath, messages);
    }
}

main();

/******************************************************************************/
