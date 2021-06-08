/**
 * coon.js
 * extjs-link
 * Copyright (C) 2021 Thorsten Suckow-Homberg https://github.com/coon-js/extjs-link
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import path from "path";
import write from "write";
import l8 from "@l8js/l8";
import fs from "fs";

/**
 * Helper for quitting out of bin.
 *
 * @param input
 */
export const quit = (input, rl) => {
    if (input === "q") {
        rl.close();
    }
};


/**
 * Returns the relative path to the symlink for including in scripts.
 * Symlink should have been created in the calling module in order to make this work.
 *
 * @param {String} symlink
 * @returns {string}
 */
const includePath = (symlink, relativePath) => {
    return relativePath + path.relative("./", symlink);
};


/**
 * Returns a json-conf with default locations to toolkit specific files
 * for copnvenient access in the calling module.
 *
 * @param {String} includePath
 * @returns {Object}
 */
const getJsonConfig = (includePath, defaults) => {

    const pd = l8.rpl("file:///", "", import.meta.url),
        jsonConfig = JSON.parse(fs.readFileSync(path.dirname(pd) + defaults.templateFile));


    return l8.vst(jsonConfig, key => l8.unify(
        l8.rpl("\\", "/", `${includePath}/${key}`), "/"
    ));
};


/**
 * Writes the config to the .extjs-link.json

 */
export const writeConfig = (symlink, relativePath, filename, defaults) => {

    write.sync(
        filename,
        JSON.stringify(getJsonConfig(includePath(symlink, relativePath), defaults)), {overwrite: true}
    );

};