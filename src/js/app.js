import barba from '@barba/core';
import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './helpers/scroll-to';

// blocks
import Header from './components/Header';
import LanguageMenu from './components/Language-menu';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

// pages
import HomePage from './pages/Home-page';
import BedsPage from './pages/Beds-page';

// global objects
let preloader = null;
let header = null;
let languageMenu = null;
let homePage = null;
let bedsPage = null;

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
  preloader.hide().then(() => {
    header.initSizeControl();
    header.initMobileMenuControl();
    preloader = null;
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
            languageMenu.init();
            header.initStyleTrigger();
            header.resetMobileMenuControl();
            scrollTo();
          }, 0);
        },
        beforeLeave() {
          homePage.destroy();
          homePage = null;
          header.destroyStyleTrigger();
          languageMenu.destroy();
        },
      },
      {
        namespace: 'contact-page',
        afterEnter() {
          setTimeout(() => {
            header.initStyleTrigger();
            header.resetMobileMenuControl();
            languageMenu.init();
          }, 0);
        },
        beforeLeave() {
          languageMenu.destroy();
          header.destroyStyleTrigger();
        },
      },
      {
        namespace: 'beds-page',
        afterEnter() {
          setTimeout(() => {
            bedsPage = new BedsPage();
            bedsPage.init();
            header.initStyleTrigger();
            header.resetMobileMenuControl();
            languageMenu.init();
            scrollTo();
          }, 0);
        },
        beforeLeave() {
          bedsPage.destroy();
          bedsPage = null;
          languageMenu.destroy();
          header.destroyStyleTrigger();
        },
      }],
  });
});
