const gulp = require('gulp');
const rename = require("gulp-rename");
const svgo = require('gulp-svgo');
const config = require('../config.js');

function svgToTwig(cb) {
  return gulp
    .src([
      config.src.img + '/inline/*.svg'
    ], {base: '.'})
    .pipe(svgo({plugins: [
        { removeAttrs: { attrs: '(data-name|id)' }},
        { removeViewBox: false }
      ]}))
    .pipe(rename(function (path) {
       path.dirname = './../../'+ config.src.templates + '/svg';
       path.basename = '_' + path.basename;
       path.extname += '.twig';
     }))
    .pipe(gulp.dest(config.dest.img));

  cb();
};

module.exports = svgToTwig;
