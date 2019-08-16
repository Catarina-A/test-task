var gulp = require('gulp');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:data', function() {
  return gulp
    .src(config.src.data + '/**/*.*')
    .pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:libs', function() {
  return gulp
    .src(config.src.libs + '/**/*.*')
    .pipe(gulp.dest(config.dest.libs));
});

gulp.task('copy:rootfiles', function() {
  return gulp
    .src(config.src.root + '/*.*')
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}',
      '!' + config.src.img + '/svgo/**/*.*'
    ])
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:assets', function() {
  return gulp
    .src(config.src.assets + '/**/*')
    .pipe(gulp.dest(config.dest.assets));
});

gulp.task('copy:video', function() {
  return gulp
    .src(config.src.video + '/**/*')
    .pipe(gulp.dest(config.dest.video));
});

gulp.task('copy:favicon', function() {
  return gulp
    .src(config.src.favicon + '/**/*')
    .pipe(gulp.dest(config.dest.favicon));
});

gulp.task('copy', [
  'copy:img',
  //'copy:assets',
  'copy:video',
  'copy:favicon',
  //'copy:rootfiles',
  //'copy:libs',
  'copy:data',
  'copy:fonts'
]);
gulp.task('copy:watch', function() {
  gulp.watch(config.src.img + '/*', ['copy']);
  gulp.watch(config.src.data + '/**/*.*', ['copy']);
});
