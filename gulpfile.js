const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');
const isProduction = process.env.NODE_ENV === "production";
console.info(`Configuring gulp build for ${isProduction ? "production" : "development"}`);

mapapps.registerTasks({
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
    }
});

gulp.task("default",
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
