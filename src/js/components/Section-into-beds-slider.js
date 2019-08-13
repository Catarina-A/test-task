import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      speed: 1000,
      allowTouchMove: false,
      effect: 'fade',
    };
    this.eventHandler = null;
  }

  slideTo(e) {
    const index = e.detail.index;
    if (this.slider && this.slider.slideTo) {
      this.slider.slideTo(index);
    }
  }

  init() {
    this.slider = new Swiper('#into-beds-image-slider', this.settings);
    this.eventHandler = this.slideTo.bind(this);
    window.addEventListener('intoBedsChangeSlide', this.eventHandler);
  }

  destroy() {
    window.removeEventListener('intoBedsChangeSlide', this.eventHandler);
    this.slider.destroy();
    this.slider = null;
    this.settings = null;
  }
}
