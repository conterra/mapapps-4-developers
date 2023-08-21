const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');
const mapappsBrowserSync = require("ct-mapapps-browser-sync");

const isProduction = process.env.NODE_ENV === "production";
console.info(`Configuring gulp build for ${isProduction ? "production" : "development"}`);

const localOverrides = (function () {
    if (isProduction) {
        // Never override defaults in production mode
        return undefined;
    }

    try {
        return require("./gulpfile.overrides");
    } catch (e) {
        // File may not exist
        return undefined;
    }
})();

// used to transport test urls in "run-browser-tests-local" task
const runBrowserTests = [];

mapapps.registerTasks({
    /** Enable debug logging */
    debug: localOverrides?.debug ?? false,
    /** enable linting */
    lintOnWatch: localOverrides?.lintOnWatch ?? true,
    /** enable es6 by default */
    forceTranspile: true,
    /* A detailed description of available setting is available at https://www.npmjs.com/package/ct-mapapps-gulp-js */
    compress: isProduction,

    /* build source maps as e.g. ".js.map" */
    sourceMaps: "file",

    /** Build Unit-Tests only in dev mode */
    rollupBuildTests: !isProduction,
    /** Amount of Threads used to build the bundles, if there are only a few bundles 1 is ok.
     *  More as 3 is normally not required.
     */
    rollupBuildMaxWorkers: localOverrides?.rollupBuildMaxWorkers ?? 1,

    /** List of build time flags, usage like: import { debug } from "build-config!".
     */
    rollupConfig: {
        debug: !isProduction
    },

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
    runBrowserTests,
    watchFinishedReceiver() {
        if (localOverrides?.autoReload ?? true) {
            mapappsBrowserSync.state.reload();
        }
    }
}, gulp);

mapappsBrowserSync.registerTask({
    // on which port to listen
    port: localOverrides?.port ?? 9090,
    // activate https protocol, generates a self signed certificate for "localhost"
    // https://browsersync.io/docs/options#option-https
    https: localOverrides?.https ?? false,

    // to prevent auto open of browser, set this to false
    urlToOpen: localOverrides?.openBrowser ?? true,
    properties: {
        paths: [
            // Ensure @@key@@ expressions filtered in tests files
            /^\/js\/tests\/(runTests.html|test-init.js|init-packs.js)$/
        ]
    },
    jsreg: {
        //npmDir : __dirname + "/node_modules/",
        npmModules: [
            "mocha",
            "chai",
            "@conterra/mapapps-mocha-runner"
        ]
    },
    // prevent reload by browser sync (reload triggered on watch end)
    externalReloadTrigger: true
}, gulp);

gulp.task("build",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel(
            "js-transpile",
            "rollup-build",
            "themes-compile"
        )
    )
);

gulp.task("lint",
    gulp.parallel(
        "js-lint"
        /*, comment in to lint .css/.less files
        "style-lint"
        */
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
