const gulp = require("gulp");
const run_sequence = require('run-sequence');
const mapapps = require('ct-mapapps-gulp-js');

mapapps.registerTasks({
    themes: [/*put custom themes here*/],
    hasBaseThemes: true,
    forceTranspile: true
});

gulp.task("default", function(callback) {
    run_sequence(
            "copy-resources",
            "themes-copy",
            ["js-transpile", "themes-compile"],
            callback);
});