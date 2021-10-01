const gulp = require('gulp');
const config = require('../config.js');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');

function sprite (cb) {
  return gulp.src(config.src.img + '/sprite/*.svg')
    .pipe(svgo({plugins: [
        { removeAttrs: { attrs: '(data-name|id|fill|stroke|style|class)' } }
      ]}))
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