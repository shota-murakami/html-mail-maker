const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const inlineCss = require('gulp-inline-css');

const browserSync = require('browser-sync');

function buildStyles() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'))
}

function inlining() {
  return gulp.src('./src/**/*.html')
    .pipe(inlineCss())
    .pipe(gulp.dest('./dist'))
}

function browserSyncTask() {
  browserSync({
    server: {
      baseDir: './dist'
    }
  })
}

const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

exports.default = function () {
  browserSyncTask()
  gulp.watch('./src/**/*.scss', gulp.series(buildStyles, browserSyncReload))
  gulp.watch('./src/*.html', gulp.series(inlining, browserSyncReload))
};