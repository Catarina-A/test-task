import barba from '@barba/core';
import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './components/scroll-to';

// blocks
import Header from './components/Header';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

// pages
import HomePage from './pages/Home-page';

// global objects
let preloader = null;
let header = null;
let homePage = null;

window.addEventListener('DOMContentLoaded', () => {
  const cursor = new Cursor({
    el: document.getElementsByClassName('cursor')[0],
    delay: 0,
    time: 0,
    watchTarget: true,
  });
  cursor.init();
});

window.addEventListener('load', () => {
  preloader = new Preloader();
  header = new Header();
  preloader.hide();

  barba.init({
    prevent: ({el}) => el.classList && el.classList.contains('barba-prevent'),
    views: [
      {
        namespace: 'home-page',
        afterEnter() {
          homePage = new HomePage();
          homePage.init();
          scrollTo();
          header.initStyleTrigger();
        },
      }],
  });
});
