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

  errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
