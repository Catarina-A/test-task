import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      freeMode: true,
      slidesPerView: 1,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
      breakpoints: {
        1023: {
          slidesPerView: 'auto',
        }
      }
    };
  }

  init() {
    this.slider = new Swiper('#beds-intro-slider', this.settings);
  }

  destroy() {
    this.slider.destroy();
    this.slider = null;
    this.settings = null;
  }
}
