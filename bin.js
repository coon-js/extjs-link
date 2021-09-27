#!/usr/bin/env node
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

import * as readline from "readline";
import symlinkDir from "symlink-dir";
import path from "path";
import * as util from "./util.js";

/**
 * - Reads path to ExtJS SDK
 * - Reads destination for symlink
 * - Creates Symlink to ExtJS SDK
 * - Builds .extjs-link.conf.json
 */
const defaults = {
    path: "../../../ext-7.4.0/build/",
    symlink: "build/extjs-link",
    configFile: "./.extjs-link.conf.json",
    templateFile: "/.extjs-link.conf.template.json",
    relativePath: "../"
};

/**
 * Readline.
 * 
 * @type {Interface}
 */
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    quit = (cmd) => util.quit(cmd, rl),
    l = console.log;


// +--------------------------------------------
// |                  int main
// +--------------------------------------------
let defaultPath    = defaults.path,
    defaultSymlink = defaults.symlink,
    confFilename = defaults.configFile,
    defaultRelative = defaults.relativePath;
l([
    "-------------------------------------------------------",
    "----             [@coon-js/extjs-link]             ----",
    "----             SymLink to ExtJS SDK              ----",
    "----     https://github.com/coon-js/extjs-link     ----",
    "----                                               ----",
    "----                (\"q\" to quit)                  ----",
    "-------------------------------------------------------"
].join("\n"));

rl.question(`path to ExtJS SDK ( ${defaultPath} ): `,  input => {
    quit(input);
    defaultPath = path.resolve(input ? input : defaultPath);
    l(`setting ExtJS SDK: ${defaultPath}`);

    rl.question(`symlink ( ${defaultSymlink} ): `,  input => {
        quit(input);

        defaultSymlink = path.resolve(input ? input : defaultSymlink);
        l(`setting symlink: ${defaultPath}`);


        rl.question(`relative path to script requiring the symlink ( ${defaultRelative} ): `,  input => {
            quit(input);

            defaultRelative = input ? input : defaultRelative;
            l(`setting relative: ${defaultRelative}`);

            rl.question(`Creating symlink at ${defaultSymlink} to  ${defaultPath}, is that okay? (yes), no: `, input => {

                quit(input === "no" ? "q" : input);

                // create symlink
                symlinkDir(defaultPath, defaultSymlink).then(result => {

                    l("symlink-dir says: ", result);

                    // save config
                    l(`Writing config to ${confFilename}...`);
                    util.writeConfig(defaultSymlink, defaultRelative, confFilename, defaults);
                    l("... done!");

                    rl.close();

                }).catch(err => {

                    console.error("symlink-dir says: ", err);
                    rl.close();

                });
            });
        });
    });

});

rl.on("close", () =>  {
    l("\nbye.");
    process.exit(0);
});