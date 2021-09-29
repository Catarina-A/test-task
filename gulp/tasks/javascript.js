const gulp = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack-stream')
const webpackConfig = require('../../webpack.config').createConfig();
// const CircularDependencyPlugin = require('circular-dependency-plugin')
// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
// const eslint = require('gulp-eslint')

module.exports = function js() {
  return gulp.src('src/js/app.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js'))
}

