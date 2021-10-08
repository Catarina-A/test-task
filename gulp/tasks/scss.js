const gulp = require('gulp');
const {series, parallel, task, watch} = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const sassGlob = require('gulp-sass-glob');
const ns = require('node-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csso = require('postcss-csso');
const config = require('../config.js');
const server = require('browser-sync').create();


const processors = [
  autoprefixer({
    //browsers: ['last 4 versions'],
    cascade: false
  }),
  require('lost'),
  csso
];


function scss(cb) {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
        outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
        precision: 5
    }))
    // .on('error', config.errorHandler)
    .on('error', function(err) {
      console.error(err.message);
      server.notify(err.message, 3000); // Display error in the browser
      this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
    })
    .pipe(postcss(processors))
    .pipe(rename(`app.css`))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css))
    .pipe(server.stream());
  
  cb();
}

module.exports = scss;