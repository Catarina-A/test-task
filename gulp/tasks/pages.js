const gulp = require('gulp');
// const {series, parallel, task, watch} = require('gulp');
const config = require('../config.js');

function pages(cb) {
  let list =  gulp
  .src(['./dist/*.html'])
  .pipe(require('gulp-filelist')('pages.html', { relative: true }))
  .pipe(require('gulp-modify-file')((content) => {
    let pages = [];
    let pagelist = '';

     const start = `
     <!doctype html>
     <html lang="en">
       <head>
         <meta charset="utf-8" />
         <title>pages</title>
         <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="stylesheet" href="/css/app.css" />
       </head>
       <body>
         <main class="pages">
           <ul class="pages__list">
     `;

     const end = `
           </ul>
         </main>
       </body>
     </html>
     `;
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
     return `${start}${pagelist}${end}`
   }))
  .pipe(gulp.dest(config.dest.html));
  return list;
  cb();
}

module.exports = pages;
