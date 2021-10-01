const gulp = require('gulp');
const {series, parallel, task} = require('gulp');
const replace = require('gulp-replace');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const prettify = require('gulp-prettify');
const frontMatter = require('gulp-front-matter');
const config = require('../config');

function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src(
      [
        config.src.templates + '/**/[^_]*.twig',
        '!'+ config.src.templates + '/svg/*.twig'
      ])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html)))
    .pipe(frontMatter({property: 'data'}))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.templates]
    }))
    .pipe(prettify({
      indent_size: 2,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: false,
      // unformatted: [],
      end_with_newline: true
    }))
    .pipe(replace('[[[hash]]]', config.hash))
    .pipe(gulp.dest(config.dest.html));
}


function twig(cb) {
  return renderHtml();

  cb();
}

module.exports = twig;