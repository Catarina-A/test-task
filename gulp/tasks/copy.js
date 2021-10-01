const gulp = require('gulp');
const {series, parallel, task, watch} = require('gulp');
const rename = require("gulp-rename");
const svgo = require('gulp-svgo');
const config = require('../config.js');




function fonts() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
};

function data() {
  return gulp
    .src(config.src.data + '/**/*.*')
    .pipe(gulp.dest(config.dest.data));
};

function libs() {
  return gulp
    .src(config.src.libs + '/**/*.*')
    .pipe(gulp.dest(config.dest.libs));
};

function rootfiles() {
  return gulp
    .src(config.src.root + '/*.*')
    .pipe(gulp.dest(config.dest.root));
};

function img() {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}',
      '!' + config.src.img + '/sprite/**/*.*',
      '!' + config.src.img + '/inline/**/*.*',
    ])
    .pipe(gulp.dest(config.dest.img));
};

function assets() {
  return gulp
    .src(config.src.assets + '/**/*')
    .pipe(gulp.dest(config.dest.assets));
};

function video() {
  return gulp
    .src(config.src.video + '/**/*')
    .pipe(gulp.dest(config.dest.video));
};

function favicon() {
  return gulp
    .src(config.src.favicon + '/**/*')
    .pipe(gulp.dest(config.dest.favicon));
};

module.exports = parallel(img, video, favicon, data, fonts);
