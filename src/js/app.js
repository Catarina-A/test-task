import barba from '@barba/core';
//import {ScrollToPlugin} from 'gsap/all';
//const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
//import scrollTo from './components/scroll-to';

//import header from './components/header';

// pages

import HomePage from './pages/Home-page';

let homePage = null;

window.addEventListener('load', () => {
  //pageLoader(); // fire scripts for current page
  // scrollTo();
  // header();

  barba.init({
    views: [
      {
        namespace: 'home-page',
        afterEnter() {
          homePage = new HomePage();
          homePage.init();
        },
      }],
  });
});
