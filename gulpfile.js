// // Require all tasks in gulp/tasks, including subfolders



let gulp = require('gulp');

var server = require('browser-sync').create();
// require('require-dir')('./gulp/tasks', {recurse: true});

// let runSequence = require('run-sequence');
// let config = require('gulp/config');

// gulp.task('default', function(cb) {
//   runSequence(
//     'build:dev',
//     'watch',
//     'server',
//     cb
//   );
// });



// ----------------------------
// config
var util = require('gulp-util');

var hash = '-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

var production = util.env.production || util.env.prod || false;
var destPath = 'dist';

var config = {
  env: 'development',
  production: production,

  hash: hash,

  src: {
    root: 'src',
    templates: 'src/templates',
    templatesData: 'src/templates/data',
    sass: 'src/sass',
    // path for sass files that will be generated automatically via some of tasks
    sassGen: 'src/sass/generated',
    js: 'src/js',
    img: 'src/img',
    assets: 'src/assets',
    video: 'src/video',
    favicon: 'src/favicon',
    svg: 'src/img/svg',
    icons: 'src/icons',
    // path to png sources for sprite:png task
    iconsPng: 'src/icons',
    // path to svg sources for sprite:svg task
    iconsSvg: 'src/icons',
    // path to svg sources for iconfont task
    iconsFont: 'src/icons',
    fonts: 'src/fonts',
    libs: 'src/libs',
    data: 'src/data'
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/img',
    assets: destPath + '/assets',
    video: destPath + '/video',
    favicon: destPath + '/favicon',
    fonts: destPath + '/fonts',
    libs: destPath + '/js',
    data: destPath + '/'
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    util.log(
      'Environment:',
      util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
    );
  },

  errorHandler: require('./gulp/util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

// module.exports = config;


// ----------------------------

gulp.task('build:dev', ()=> {
  config.setEnv('development');
  config.logEnv();
  gulp.series('clean', gulp.parallel('sass', 'nunjucks', 'webpack'),'copy');
});



// --------------
// sass
// var gulp         = require('gulp');
// var sass         = require('gulp-sass');
var sass = require('gulp-sass')(require('node-sass'));
var ns         = require('node-sass');


var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
// var config       = require('../config');
var csso = require('postcss-csso');

var processors = [
    autoprefixer({
        //browsers: ['last 4 versions'],
        cascade: false
    }),
    require('lost'),
    /*mqpacker({
        sort: sortMediaQueries
    }),*/
    csso
];

gulp.task('sass', function() {
    return gulp
        .src(config.src.sass + '/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
            precision: 5
        }))
        .on('error', config.errorHandler)
        .pipe(postcss(processors))
        .pipe(rename(`app.css`))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(server.stream());
});

gulp.task('sass:watch', function() {
    console.log('sass watch');
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', gulp.parallel('sass'));
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
// --------------


// --------------
// nunjucks
// var gulp = require('gulp');
var replace = require('gulp-replace');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var changed = require('gulp-changed');
var prettify = require('gulp-prettify');
var frontMatter = require('gulp-front-matter');
// var config = require('../config');

function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.templates + '/**/[^_]*.twig'])
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

gulp.task('nunjucks', function() {
  return renderHtml();
});

gulp.task('nunjucks:changed', function() {
  return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
  gulp.watch([
    config.src.templates + '/**/*.twig'
  ], gulp.parallel('nunjucks:changed'));

  gulp.watch([
    config.src.templates + '/**/*.twig'
  ], gulp.parallel('nunjucks'));
});

// --------------




// --------------
// webpack
// let gulp = require('gulp');
let webpack = require('webpack');
let gutil = require('gulp-util');
let notify = require('gulp-notify');
// let server = require('./server');
// let config = require('../config');
let webpackConfig = require('./webpack.config').createConfig;

function handler(err, stats, cb) {
  let errors = stats.compilation.errors;

  if (err) throw new gutil.PluginError('webpack', err);

  if (errors.length > 0) {
    notify.onError({
      title: 'Webpack Error',
      message: '<%= error.message %>',
      sound: 'Submarine'
    }).call(null, errors[0]);
  }

  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunks: false
  }));

  server.reload();
  if (typeof cb === 'function') cb();
}

gulp.task('webpack',function(cb) {
  webpack(webpackConfig(config.env)).run(function(err, stats) {
    handler(err, stats, cb);
  });
});

gulp.task('webpack:watch', function() {
  webpack(webpackConfig(config.env)).watch({
    aggregateTimeout: 100,
    poll: false
  }, handler);
});


// --------------



// --------------
// watch

// --------------




// --------------------------
// copy
// var gulp = require('gulp');
// var config = require('../config.js');

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

gulp.task('copy', gulp.parallel('copy:img','copy:video','copy:favicon','copy:data','copy:fonts'));

gulp.task('copy:watch', function() {
  gulp.watch(config.src.img + '/*', ['copy']);
  gulp.watch(config.src.data + '/**/*.*', ['copy']);
});

// --------------------------



//clean
// ----------------
// var gulp = require('gulp');
var del = require('del');
// var util = require('gulp-util');
// var config = require('../config');

gulp.task('clean', function(cb) {
  return del([
    config.dest.root
  ]).then(function(paths) {
    util.log('Deleted:', util.colors.magenta(paths.join('\n')));
  });
});


gulp.task('server', ()=>{
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
    notify: false,
    ghostMode: false,
    online: true,
    tunnel: util.env.tunnel || null
  });
});
// ----------------

gulp.task('watch', gulp.series('copy', gulp.parallel('nunjucks:watch', 'webpack:watch', 'sass:watch')));


gulp.task('default', gulp.parallel('build:dev', 'watch', 'server'));

// gulp.task('default', (cb)=>{
//   console.log('start');
//   cb();
// });