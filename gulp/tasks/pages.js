const gulp = require('gulp');
const config = require('../config.js');
const template = require('../helpers/pages-template.js');

function pages(cb) {
  let list =  gulp
  .src(['./dist/*.html'])
  .pipe(require('gulp-filelist')('pages.html', { relative: true }))
  .pipe(require('gulp-modify-file')((content) => {
    let pages = [];
    let pagelist = '';
    let filesArray = content.split('"');

    filesArray.forEach(function(pageFile) {
      if (pageFile.includes('.html') && !pageFile.includes('pages.html')) {
        pages.push(pageFile);
      }
    });

    pages.sort((a, b)=>{
      return a.includes('index') ? -1 : 0;
    });

    pages.forEach(function(page) {
      let pagename = '';

      if (page.includes('index')) {
        pagename = 'home';
      } else {
        pagename = page.replace('.html', '').replace(/-/g, ' ');
      }
      
      pagelist += `
        <li class="pages__item">
          <a href="${page}" class="pages__link" target="_blank">${pagename}</a>
        </li>
      `;
    });
    return `${template.start}${pagelist}${template.end}`
  }))
  .pipe(gulp.dest(config.dest.html));
  return list;
  cb();
}

module.exports = pages;