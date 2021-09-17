import 'regenerator-runtime';

import commonScripts from './common';
import pageLoader from './page-loader';

document.addEventListener('DOMContentLoaded', () => {

  commonScripts(); // fore common scripts
  pageLoader(); // fire scripts for loaded page

});
