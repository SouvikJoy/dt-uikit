"use strict";

const gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglifycss = require("gulp-uglifycss"),
  rename = require("gulp-rename");

gulp.task("build-css", function () {
  return gulp
    .src(["src/assets/main.css", "src/components/**/*.css"])
    .pipe(concat("DebuggerVue.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(uglifycss({ uglyComments: true }))
    .pipe(rename("DebuggerVue.min.css"))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("build-styles", gulp.series("build-css"));
