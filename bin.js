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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const quit = (input) => {
    if (input === "/q") {
        rl.close();
    }
};

let defaultPath    = "../../../ext-7.4.0/build/",
    defaultSymlink = "build/extjs-build";

const log = console.log;
log("---- [extjs-build]   SymLink to ExtJS libraries");
log("----                         (enter /q to quit)");
log("---- ");
rl.question("ExtJS build ([" + defaultPath + "]): ",  input => {
    quit(input);

    defaultPath = path.resolve(input ? input : defaultPath);

    rl.question("symlink ([" + defaultSymlink + "]): ",  input => {
        quit(input);

        defaultSymlink = path.resolve(input ? input : defaultSymlink);


        rl.question("Creating symlink at " + defaultSymlink + " to " + defaultPath + ", is that okay? ([yes], no): ", input => {

            quit(input === "no" ? "/q" : "");

            symlinkDir(defaultPath, defaultSymlink).then(result => {
                console.log("symlink-dir says: ", result);
                rl.close();
            })
                .catch(err => {
                    console.error("symlink-dir says: ", err);
                    rl.close();
                });
        });

    });

});

rl.on("close", () =>  {
    console.log("\nbye.");
    process.exit(0);
});