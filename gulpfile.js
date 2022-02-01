const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');

mapapps.registerTasks({
    /* A detailed description of available setting is available at https://www.npmjs.com/package/ct-mapapps-gulp-js */

    /* a list of themes inside this project */
    themes: ['everlasting'],

    themesSrcLocation: "./src/main/js/bundles/custom-theme-extension",
    themesDestLocation: "./target/webapp/js/bundles/custom-theme-extension"
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
