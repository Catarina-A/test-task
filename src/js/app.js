import barba from '@barba/core';



//import {ScrollToPlugin} from 'gsap/all';
//const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
//import scrollTo from './components/scroll-to';

//import header from './components/header';

import pageLoader from './page-loader';

window.addEventListener('load', () => {
  //pageLoader(); // fire scripts for current page
  // scrollTo();
  // header();

  barba.init({
    transitions: [{
      leave({ current, next, trigger }) {
        // do something with `current.container` for your leave transition
        // then return a promise or use `this.async()`
      },
      enter({ current, next, trigger }) {
        // do something with `next.container` for your enter transition
        // then return a promise or use `this.async()`
      }
    }]
  });
});
