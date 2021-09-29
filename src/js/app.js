import pageLoader from './page-loader';
import commonScripts from './common';

window.addEventListener('load', () => {
  pageLoader(); // fire scripts for loaded page
  commonScripts(); // fore common scripts
});
