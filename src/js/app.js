import barba from '@barba/core';
import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './components/scroll-to';

// blocks
import Header from './components/Header';
import LanguageMenu from './components/Language-menu';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

// pages
import HomePage from './pages/Home-page';

// global objects
let preloader = null;
let animatedFirstTIme = false;
let header = null;
let languageMenu = null;
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
  languageMenu = new LanguageMenu();
  preloader.hide();
  setTimeout(() => {
    animatedFirstTIme = true;
  }, 4000);

  barba.init({
    prevent: ({el}) => el.classList && el.classList.contains('barba-prevent'),
    views: [
      {
        namespace: 'home-page',
        afterEnter() {
          if (animatedFirstTIme) {
            setTimeout(() => {
              const blurContainer = document.getElementById('page-blur-filter');
            TweenLite.set(blurContainer, {
              webkitFilter: `blur(0) brightness(100%)`,
              filter: `blur(0) brightness(100%)`,
            });
            }, 50)
          }
          homePage = new HomePage();
          homePage.init();
          scrollTo();
          languageMenu.init();
          header.initStyleTrigger();
        },
        beforeLeave() {
          languageMenu.destroy();
        },
      },
      {
        namespace: 'contact-page',
        afterEnter() {
          if (animatedFirstTIme) {
            setTimeout(() => {
              const blurContainer = document.getElementById('page-blur-filter');
            TweenLite.set(blurContainer, {
              webkitFilter: `blur(0) brightness(100%)`,
              filter: `blur(0) brightness(100%)`,
            });
            }, 50)
          }
          languageMenu.init();
        },
        beforeLeave() {
          languageMenu.destroy();
        },
      }],
  });
});
