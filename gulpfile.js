const gulp = require("gulp");
const run_sequence = require('run-sequence');
const mapapps = require('ct-mapapps-gulp-js');

mapapps.registerTasks({
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
   }
});

gulp.task("default", function(callback) {
    run_sequence(
            "copy-resources",
            "themes-copy",
            ["js-transpile", "themes-compile"],
            callback);
});