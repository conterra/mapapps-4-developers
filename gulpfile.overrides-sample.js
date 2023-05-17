/*
 * Copyright (C) con terra GmbH
 */
/*
  Rename this file to `gulpfile.overrides.js`, then you are able to modify the listed build flags.

  Do not commit this file, it is intended to be a local developer file.

*/
module.exports = {
    // debug mode of ct-mapapps-gulp-js
    debug: true,

    // enable linting during watch
    lintOnWatch: true,

    // use https not http (uses self signed certificate )
    https: false,

    // should the browser reload the open windows if files change
    autoReload: true,

    // disable initial build before starting the dev server
    previewNoInitialBuild: false,

    // defines how much workers are maximal allowed to use (3 is enough)
    rollupBuildMaxWorkers: 1,

    // on which port should the dev server be opened
    port: 9090,

    // should the browser be opened pointing to the dev server?
    openBrowser: true,
};
