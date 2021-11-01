import commonScripts from './common';

/**
* Fire scripts when HTML loaded and DOM completed
*/
document.addEventListener('DOMContentLoaded', () => {
  commonScripts(); // for common scripts
});

/**
* Fire scripts when images, styles and other outer resourses loaded
*/
window.addEventListener('load', () => {
});
