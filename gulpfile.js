'use strict';

// --- Modules & Plugins ---
var gulp = require("gulp"),
  fs = require("fs"),
  sass = require("gulp-sass"),
  connect = require("gulp-connect");
sass.compiler = require('node-sass');

// --- Source Variables ---
const cssSrc = 'css/src/main.scss';

// --- Gulp Connect (live server with automatic reload) ---
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
})
gulp.task('html', function(done) {
  gulp.src('*.html')
    .pipe(connect.reload());
  done();
})

// --- Sass Task ---
gulp.task("sass", function () {
  return gulp.src(cssSrc)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css/dist/'))
    .pipe(connect.reload());
});

// --- Watch Task ---
gulp.task("watch", function() {
  // copy the following line to watch additional files
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch(cssSrc, gulp.series('sass'));
  gulp.watch('css/src/*', gulp.series('sass'));
});

// --- Default Task ---
gulp.task('default', gulp.parallel('sass', 'connect', 'watch'));
