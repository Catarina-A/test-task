const gulp = require('gulp');
const config = require('../config.js');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

function sprite (cb) {
  return gulp.src(config.src.img + '/sprite/*.svg')
    // .pipe(
    //   svgmin({
    //     js2svg: {
    //       pretty: true,
    //     },
    //   })
    // )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
          mode: {
            symbol: {
              sprite: '../sprite.svg',
              render: {
                scss: {
                  template: 'gulp/helpers/sprite-svg-template.scss',
                  dest: '/'+config.src.sass + '/generated/_sprite.scss'
                },
              },
            },
          },
        }
    ))
    .pipe(gulp.dest(config.dest.img));

  cb();
}

module.exports = sprite;