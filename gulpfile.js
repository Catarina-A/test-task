const gulp = require('gulp');
const {series, parallel, task, watch} = require('gulp');
const requireDir = require('require-dir');
const server = require('browser-sync').create();
const util = require('gulp-util');
const tasks = requireDir('./gulp/tasks', {recurse: true});
const config = require('./gulp/config');

function setEnv(envName) {
  return cb => {
    config.setEnv(envName);
    config.logEnv();
    cb()
  }
}

function reload(cb) {
  server.reload()
  cb()
}

task('watch', (cb)=>{
  server.init({
    server: {
      baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      config.dest.html + '/*.html',
      config.dest.css + '/*.css',
      config.dest.img + '/**/*'
    ],
    port: util.env.port || 3000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(util.env.open),
    notify: config.server.notify,
    ghostMode: false,
    online: true,
    tunnel: util.env.tunnel || null
  });


  watch(config.src.img + '/**/*.*', series(tasks.copy));

  watch(config.src.img + '/sprite/*', series(tasks.sprite, reload));

  watch(config.src.img + '/inline/*', series(tasks.svgToTwig, tasks.twig));

  watch([config.src.templates + '/**/*.twig'], series(tasks.twig));

  watch(config.src.sass + '/**/*.{sass,scss}', series(tasks.scss));

  watch(config.src.js + '/**/*.js', series(tasks.javascript, reload));

  watch([config.dest.html + '/**/*.html'], { events: ['add']}, series(tasks.pages));

  cb();
});


const build = series(tasks.clean, tasks.sprite, tasks.svgToTwig, parallel(tasks.scss, tasks.twig), tasks.copy)

// exports.default = series(setEnv('development'), parallel(build, tasks.javascript), tasks.pages, tasks.sprite, 'watch');
exports.default = series(setEnv('development'), parallel(build, tasks.javascript), tasks.pages, 'watch');
exports.build = series(setEnv('production'), parallel(build, tasks.javascript), tasks.pages, tasks.sprite);
