const gulp = require("gulp");
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

gulp.task("default",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel("js-transpile", "themes-compile")
    ));