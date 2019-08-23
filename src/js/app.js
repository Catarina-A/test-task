import 'regenerator-runtime';
//import 'core-js'

import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './helpers/scroll-to';
import LazyImages from './helpers/Lazy-images';
