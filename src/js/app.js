import barba from '@barba/core';
import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './components/scroll-to';

// helpers
import {globalElements} from './options';

// blocks
import Header from './components/Header';
import LanguageMenu from './components/Language-menu';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

// pages
import HomePage from './pages/Home-page';

// global objects
let preloader = null;
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
  header = new Header({header: globalElements.header});
  languageMenu = new LanguageMenu({
    overlay: globalElements.headerOverlay,
    mainButton: globalElements.languageButton,
  });
  preloader.hide().then(() => {
    preloader = null;
    header.initSizeControl();
  });

  barba.init({
    debug: true,
    prevent: ({el}) => el.classList && el.classList.contains('barba-prevent'),
    views: [
      {
        namespace: 'home-page',
        afterEnter() {
          setTimeout(() => {
            homePage = new HomePage();
            homePage.init();
            scrollTo();
            languageMenu.init();
            header.initStyleTrigger();
          }, 0);
        },
        beforeLeave() {
          header.destroyStyleTrigger();
          languageMenu.destroy();
        },
      },
      {
        namespace: 'contact-page',
        afterEnter() {
          setTimeout(() => {
            header.initStyleTrigger();
            languageMenu.init();
          }, 0);
        },
        beforeLeave() {
          languageMenu.destroy();
          header.destroyStyleTrigger();
        },
      }],
  });
});
