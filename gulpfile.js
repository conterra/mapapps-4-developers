const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');
const mapappsBrowserSync = require("ct-mapapps-browser-sync");

const isProduction = process.env.NODE_ENV === "production";
console.info(`Configuring gulp build for ${isProduction ? "production" : "development"}`);

// used to transport test urls in "run-browser-tests-local" task
const runBrowserTests = [];

mapapps.registerTasks({
    /** enable linting */
    lintOnWatch: true,
    /** enable es6 by default */
    forceTranspile: true,
    /* A detailed description of available setting is available at https://www.npmjs.com/package/ct-mapapps-gulp-js */
    compress: isProduction,

    /* build source maps as e.g. ".js.map" */
    sourceMaps: "file",

    /* a list of themes inside this project */
    themes: ['theme-custom'],
    /* state that the custom theme will be dependant from map.apps everlasting theme that provides the base styles */
    hasBaseThemes: true,
    /* state that we want to support vuetify components and therefore need the vuetify core styles*/
    hasVuetify: true,
    themeChangeTargets: {
        "vuetify": [
            "theme-custom"
        ]
    },
    /* A list oft target browser versions. This should be streamlined with Esri JS API requirements. */
    transpileTargets: {
        firefox: 102,
        edge: 104,
        chrome: 104,
        safari: 15
    },
    runBrowserTests
}, gulp);

mapappsBrowserSync.registerTask({
    port: 8080,

    // activate https protocol, generates a self signed certificate for "localhost"
    https: true,

    jsreg: {
        //npmDir : __dirname + "/node_modules/",
        npmModules: [
            "mocha",
            "chai",
            "@conterra/mapapps-mocha-runner"
        ]
    }
}, gulp);

gulp.task("build",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel(
            "js-transpile",
            "themes-compile"
        )
    )
);

gulp.task("lint",
    gulp.parallel(
        "js-lint"
        //,"style-lint"
    ));

gulp.task("preview",
    gulp.series(
        "build",
        gulp.parallel(
            "watch",
            "browser-sync"
        )
    ));

gulp.task("run-tests",
    gulp.series(
        "browser-sync-start",
        function transportTestUrls() {
            // transport test url to run-browser-tests
            // eslint-disable-next-line max-len
            const testsAt = mapappsBrowserSync.state.url + "/resources/jsregistry/root/@conterra/mapapps-mocha-runner/latest/mocha.html?boot=/js/tests/test-init.js&timeout=5000&test=sample_tests/all&reporter=tap";
            runBrowserTests.push(testsAt);
            return Promise.resolve();
        },
        "run-browser-tests",
        "browser-sync-stop"
    ));

gulp.task("test",
    gulp.series(
        "build",
        "lint",
        "run-tests"
    ));

gulp.task("compress",
    gulp.series(
        "build",
        "themes-compress",
        "lint"
    )
);

gulp.task("default",
    gulp.series(
        "build",
        "lint"
    ));
