# @coon-js/extjs-link ![MIT](https://img.shields.io/npm/l/@coon-js/extjs-link) [![npm version](https://badge.fury.io/js/@coon-js%2Fextjs-link.svg)](https://badge.fury.io/js/@coon-js%2Fextjs-link)

NPM package providing quick setup for symlinks to an existing ExtJS build.

Sencha does not provide builds via their NPM repository. This package
makes sure that ExtJS-sources are available when testing and developing stand-alone packages.

## Requirements
An existing ExtJS-SDK containing builds on your disk. The binary of this package guides you through the process of setting the symlinks
to the required sources properly.

## Installation
```bash
$ npm install --save-dev @coon-js/extjs-link
```

Use 
```bash
$ npm run build:dev
```
for creating the dev environment.

## Usage
Once the script is invoked, it will guide you through the process of creating the symlinks.
```bash
$ npx extjs-link
```

