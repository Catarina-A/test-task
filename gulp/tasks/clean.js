const gulp = require('gulp');
const {series, parallel, task, watch} = require('gulp');
const del = require('del');
const util = require('gulp-util');
const config = require('../config.js');

function clean(cb) {
  return del([
    config.dest.root,
    config.src.templates + '/svg',
  ]).then(function(paths) {
    util.log('Deleted:', util.colors.magenta(paths.join('\n')));
    cb();
  });
}

module.exports = clean;