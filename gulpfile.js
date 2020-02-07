const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');
const mapappsBrowserSync = require("ct-mapapps-browser-sync");


// used to transport test urls in "run-browser-tests-local" task
const runBrowserTests = [];

mapapps.registerTasks({
    /** enable linting */
    lintOnWatch: true,
    /** enable es6 by default */
    forceTranspile: true,
    /* A detailed description of available setting is available at https://www.npmjs.com/package/ct-mapapps-gulp-js */
    /* a list of themes inside this project */
    themes: ['theme-custom'],
    /* state that the custom theme will be dependant from map.apps everlasting theme that provides the base styles */
    hasBaseThemes: true,
    /* state that we want to support vuetify components and therefore need the the vuetify core styles*/
    hasVuetify: true,
    themeChangeTargets: {
        "vuetify": [
            "theme-custom"
        ]
    },
    runBrowserTests
});

mapappsBrowserSync.registerTask({
    port: 8080
}, gulp);

gulp.task("build",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel(
            "js-lint",
            //"style-lint",
            "js-transpile",
            "themes-compile"
        )
    )
);

gulp.task("compress",
    gulp.series(
        "default",
        "themes-compress"
    )
);

gulp.task("lint",
    gulp.parallel(
        "js-lint",
        "style-lint"
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
            const testsAt = mapappsBrowserSync.state.url + "/js/tests/runTests.html";
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

gulp.task("default",
    gulp.series(
        "build",
        "lint"
    ));
