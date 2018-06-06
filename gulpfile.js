const gulp = require("gulp");
const run_sequence = require('run-sequence');
const mapapps = require('ct-mapapps-gulp-js');

mapapps.registerTasks({
    /* a list of themes inside this project */
    themes: ['theme-custom'],
    /* state that the custom theme will be dependant from map.apps everlasting theme that provides the base styles */
    hasBaseThemes: true,
    /* state that we want to support vuetify components and therefore need the the vuetify core styles*/
    hasVuetify: true,
    forceTranspile: true,
    themesSrcLocation: "./src/main/js/bundles",
    themesDestLocation: "./target/webapp/js/bundles",
    themeChangeTargets: {
       "vuetify": [
           "theme-custom"
       ]
   }
});

gulp.task("default", function(callback) {
    run_sequence(
            "copy-resources",
            "themes-copy",
            ["js-transpile", "themes-compile"],
            callback);
});