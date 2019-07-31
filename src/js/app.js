/*import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
//import 'url-search-params-polyfill';
import {polyfill} from 'es6-promise';
polyfill();*/

//import IntersectionObserver from 'intersection-observer-polyfill';

//import {ScrollToPlugin} from 'gsap/all';

//const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
//import scrollTo from './components/scroll-to';
//import header from './components/header';

import pageLoader from './page-loader';

window.addEventListener('load', () => {
  //pageLoader(); // fire scripts for current page
  // scrollTo();
  // header();

  const page = document.querySelector('.page-content-wrapper');
  page.style.opacity = 1;
});
