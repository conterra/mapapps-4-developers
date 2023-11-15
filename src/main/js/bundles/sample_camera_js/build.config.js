/*
 * Copyright (C) con terra GmbH
 */
/*
 This build file, configures information for the rollup-build task:
 See: https://www.npmjs.com/package/ct-mapapps-gulp-js#user-content-rollup-build
*/
module.exports = {
    // normally the type should be "bundle"
    type: "bundle",
    // list all files, which should stay after the build
    // In this case only the "module.js" is the remaining artifact, all other files will be integrated into this file.
    entryPoints: ["./module"]
};
