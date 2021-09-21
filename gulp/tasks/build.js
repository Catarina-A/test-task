let gulp = require('gulp');
// let runSequence = require('run-sequence');
let config = require('../config');

// function build(cb) {
//   runSequence(
//     'clean',
//     'sass',
//     'nunjucks',
//     'webpack',
//     'copy',
//     cb
//   );
// }

// gulp.task('build', function(cb) {
//   config.setEnv('production');
//   config.logEnv();
//   build(cb);
// });

gulp.task('build:dev', ()=> {
  config.setEnv('development');
  config.logEnv();
  gulp.series('clean', gulp.parallel('sass', 'nunjucks', 'webpack'),'copy');
});

